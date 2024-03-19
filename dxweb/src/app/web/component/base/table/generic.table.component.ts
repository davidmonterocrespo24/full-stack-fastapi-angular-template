import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import {
  MatTableDataSource,
  MatTableDataSourcePaginator,
} from '@angular/material/table';
import { TableColumn } from './interface/table.column';
import { MatPaginator } from '@angular/material/paginator';

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

  constructor() {
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
  
}
