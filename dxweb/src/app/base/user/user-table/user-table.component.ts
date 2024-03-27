import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormField } from 'src/app/web/component/base/form/interface/form-field.interface';
import { UserService } from '../../service/user.service';
import { TableColumn } from 'src/app/web/component/base/mat-custom-table/models/tableColumn';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.sass'],
})
export class UserTableComponent implements OnInit{
  @Input() data: FormField[] = [];

  userList: any[] = [];

  tableColumns: TableColumn[] = [
    { columnDef: 'id', header: 'id'},
    { columnDef: 'username',    header: 'Username' },
    { columnDef: 'email', header: 'Email'},
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

  formFields: FormlyFieldConfig[] = [];
  ////////////////////////////////////////////

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.selectedRecordForm = this.formBuilder.group({});
    this.getUsers();
    console.log('UserTableComponent', this.userList);
  }

  ngOnInit(): void {
    console.log('UserTableComponent ngOnInit');
    this.getUsers();
    console.log('UserTableComponent', this.userList);
    this.route.url.subscribe((urlSegments) => {
      this.showFormView = urlSegments.some(
        (segment) => segment.path === 'edit'
      );
    });

    this.route.params.subscribe((params) => {
      this.userId = +params['id']; // Obtener el ID del usuario de los parámetros de ruta
      this.getUsers();
      console.log('UserTableComponent 2', this.userList);
    });

    //Add in URL
    this.route.url.subscribe((urlSegments) => {
      this.showFormView = urlSegments.some((segment) => segment.path === 'add');
    });
    this.formFields = this.generateFormlyFields();
  }

  getUsers() {
    /*this.userService.getUsers().subscribe(
      (users: any[]) => {
        this.userList = users;
        console.log('UserTableComponent 3', this.userList);
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );*/

    this.userList =[
      {
          "id": 1,
          "username": "usuario_ejemplo",
          "email": "correo@example.com"
      },
      {
          "id": 2,
          "username": "david",
          "email": "as@asd"
      },
      {
          "id": 6,
          "username": "u2suario_2ejemplo",
          "email": "co2rreo@example.com"
      },
      {
          "id": 8,
          "username": "davidsdfsdf",
          "email": "sdfsdfsdf"
      },
      {
          "id": 9,
          "username": "davidsdfsdfas",
          "email": "sdfsdfsdf@sdf"
      }
  ]
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

  generateFormlyFields(): any[] {
    const formlyFields: any[] = [];
    let fieldGroup: any[] = [];

    // Itera sobre las columnas de la tabla
    this.tableColumns.forEach((column, index) => {
      // Crea un campo de ngx-formly para cada columna
      const field = {
        key: column.columnDef, // Usa el dataKey como clave del campo
        type: 'input', // Tipo de campo, puedes personalizar según tus necesidades
        className: index % 2 === 0 ? 'col-6' : 'col-6', // Alterna entre columnas de 6 y 3 basado en el índice
        templateOptions: {
          label: column.header, // Nombre de la columna como etiqueta del campo
          placeholder: column.header, // Nombre de la columna como marcador de posición del campo
          required: false, // Puedes definir la propiedad requerida según tus necesidades
        },
      };

      // Agrega el campo al array de campos de ngx-formly
      fieldGroup.push(field);

      // Si es el último elemento de la fila o el último elemento en general, agrupa los campos en una fila
      if ((index + 1) % 2 === 0 || index === this.tableColumns.length - 1) {
        formlyFields.push({
          fieldGroupClassName: 'row',
          fieldGroup: [...fieldGroup],
        });
        // Reinicia el grupo de campos
        fieldGroup = [];
      }
    });

    return formlyFields;
  }

  generateFormlyFields2(): any[] {
    const formlyFields: any[] = [];

    // Itera sobre las columnas de la tabla
    this.tableColumns.forEach((column) => {
      // Crea un campo de ngx-formly para cada columna
      const field = {
        key: column.columnDef, // Usa el dataKey como clave del campo
        type: 'input', // Tipo de campo, puedes personalizar según tus necesidades
        templateOptions: {
          label: column.header, // Nombre de la columna como etiqueta del campo
          placeholder: column.header, // Nombre de la columna como marcador de posición del campo
          required: false, // Puedes definir la propiedad requerida según tus necesidades
        },
      };

      // Agrega el campo al array de campos de ngx-formly
      formlyFields.push(field);
    });

    return formlyFields;
  }

  onTableAction(event: any) {
    console.log('event', event)
  }
}
