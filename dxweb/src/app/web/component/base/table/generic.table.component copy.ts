import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Inject ,
  inject,
  ViewChild,
} from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import {
  MatTableDataSource,
  MatTableDataSourcePaginator,
} from '@angular/material/table';
import { TableColumn } from './interface/table.column';
import { MatPaginator } from '@angular/material/paginator';

import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { QueryBuilderComponent, QueryBuilderConfig } from 'ngx-angular-query-builder';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { User } from 'src/app/models/user';

export interface Fruit {
  name: string;
}


@Component({
  selector: 'app-query-builder-dialog',
  templateUrl: './query-builder-dialog.component.html'
})
export class QueryBuilderDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<QueryBuilderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}

@Component({
  selector: 'app-table',
  templateUrl: './generic.table.component.html',
  styleUrls: ['./generic.table.component.sass'],
})
export class GenericTableComponent implements OnInit, AfterViewInit {
  public tableDataSource: MatTableDataSource<any> = new MatTableDataSource<any>(
    []
  );
  public displayedColumns: string[];
  @ViewChild(MatPaginator, { static: false }) matPaginator:
    | MatTableDataSourcePaginator
    | undefined;
  @ViewChild(MatSort, { static: true }) matSort: MatSort | undefined;

  @Input() isPageable = false;
  @Input() isSortable = false;
  @Input() isFilterable = false;
  @Input() tableColumns: TableColumn[];
  @Input() rowActionIcon: string;
  @Input() paginationSizes: number[] = [5, 10, 15];
  @Input() defaultPageSize = this.paginationSizes[1];

  @Output() sort: EventEmitter<Sort> = new EventEmitter();
  @Output() rowAction: EventEmitter<any> = new EventEmitter<any>();

  
  // this property needs to have a setter, to dynamically get changes from parent component
  @Input() set tableData(data: any[]) {
    this.setTableDataSource(data);
  }


  selection = new SelectionModel<any>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.tableDataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.tableDataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: User): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  fruits: Fruit[] = [{name: 'Lemon'}, {name: 'Lime'}, {name: 'Apple'}];

  announcer = inject(LiveAnnouncer);

  query = {
    condition: 'and',
    rules: [
      {field: 'age', operator: '<=', value: 'Bob'},
      {field: 'gender', operator: '>=', value: 'm'}
    ]
  };

  config: QueryBuilderConfig = {
    fields: {
      age: {name: 'Age', type: 'number'},
      gender: {
        name: 'Gender',
        type: 'category',
        options: [
          {name: 'Male', value: 'm'},
          {name: 'Female', value: 'f'}
        ]
      }
    }
  }

  openQueryBuilderDialog(): void {
    const dialogRef = this.dialog.open(QueryBuilderDialogComponent, {
      width: '500px', // Ajusta el ancho según tu preferencia
      data: {
        // Puedes pasar los datos necesarios al componente del diálogo aquí
        query: this.query,
        config: this.config
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo ha sido cerrado.');
      // Puedes manejar el resultado aquí si es necesario
    });
  }
  
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);

      this.announcer.announce(`Removed ${fruit}`);
    }
  }

  edit(fruit: Fruit, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(fruit);
      return;
    }

    // Edit existing fruit
    const index = this.fruits.indexOf(fruit);
    if (index >= 0) {
      this.fruits[index].name = value;
    }
  
}

  constructor(public dialog: MatDialog) {
    this.tableColumns = [];
    this.rowActionIcon = '';
    this.displayedColumns = [];
  }

  ngOnInit(): void {
    const columnNames = this.tableColumns.map(
      (tableColumn: TableColumn) => tableColumn.name
    );
    if (this.rowActionIcon) {
      this.displayedColumns = [this.rowActionIcon, ...columnNames];
    } else {
      this.displayedColumns = columnNames;
    }
  }

  // we need this, in order to make pagination work with *ngIf
  ngAfterViewInit(): void {
    if (this.matPaginator) {
      this.tableDataSource.paginator = this.matPaginator;
    }
  }

  setTableDataSource(data: any[]) {
    this.tableDataSource = new MatTableDataSource<any>(data);
    if (this.matPaginator) {
      this.tableDataSource.paginator = this.matPaginator;
    }
    if (this.matSort) {
      this.tableDataSource.sort = this.matSort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableDataSource.filter = filterValue.trim().toLowerCase();
  }

  sortTable(sortParameters: Sort) {
    // defining name of data property, to sort by, instead of column name
    if (this.tableColumns.length > 0) {
      const column = this.tableColumns.find(
        (column) => column.name === sortParameters.active
      );
      if (column) {
        sortParameters.active = column.dataKey;
      }
    }
    this.sort.emit(sortParameters);
  }

  emitRowAction(row: any) {
    this.rowAction.emit(row);
  }

  openCreateForm() {
  }
  
}
