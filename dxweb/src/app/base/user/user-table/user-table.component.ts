import { FormBuilder, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { UserService } from 'src/app/base/service/user.service';
import { FormField } from 'src/app/web/component/base/form/interface/form-field.interface';
import { TableColumn } from 'src/app/web/component/base/table/interface/table.column';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.sass'],
})
export class UserTableComponent {
  userList: any[] = [];
  tableColumns: TableColumn[] = [
    { name: 'ID', dataKey: 'id', position: 'left', isSortable: true },
    {
      name: 'Username',
      dataKey: 'username',
      position: 'left',
      isSortable: true,
    },
    { name: 'Email', dataKey: 'email', position: 'left', isSortable: true },
  ];

  selectedRecordData: any;
  selectedRecordForm: FormGroup;
  showFormView: boolean = false;
  userId: number | undefined;

  selectedRecordFields: FormField[] = [
    { key: 'id', label: 'id', type: 'text', required: true },
    { key: 'username', label: 'username', type: 'text', required: true },
    { key: 'email', label: 'email', type: 'email', required: true },
  ];

  ////////////////////////////////////////////


  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.selectedRecordForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.route.url.subscribe((urlSegments) => {
      this.showFormView = urlSegments.some(
        (segment) => segment.path === 'edit'
      );
    });

    this.route.params.subscribe((params) => {
      this.userId = +params['id']; // Obtener el ID del usuario de los parámetros de ruta
        this.getUsers();
          });
  }
  

  getUsers() {
    this.userService.getUsers().subscribe(
      (users: any[]) => {
        this.userList = users;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  onViewRecord(record: any) {
    const userId = record.id;
    this.router.navigate(['/user/edit', userId]);
  }

  onFormSubmit(formData: any) {
    // Lógica para manejar la submisión del formulario
  }

  onRowAction(row: any) {
    console.log('Row action:', row);
  }
}
