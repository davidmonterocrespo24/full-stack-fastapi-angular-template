import { FormBuilder, FormGroup } from '@angular/forms';
import { Component,Input } from '@angular/core';
import { UserService } from 'src/app/base/service/user.service';
import { FormField } from 'src/app/web/component/base/form/interface/form-field.interface';
import { TableColumn } from 'src/app/web/component/base/table/interface/table.column';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.sass'],
})
export class UserTableComponent {
  @Input() data: FormField[] = [];

  userList: any[] = [];
  tableColumns: TableColumn[] = [
    {
      name: 'Selection',
      dataKey: 'select',
      isSortable: false,
      position: 'left',
    },

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


  formFields: FormlyFieldConfig[] = []
  ////////////////////////////////////////////

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
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

    //Add in URL
    this.route.url.subscribe((urlSegments) => {
      this.showFormView = urlSegments.some(
        (segment) => segment.path === 'add'
      );
    });
    this.formFields = this.generateFormlyFields();
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

  generateFormlyFields(): any[] {
    const formlyFields: any[] = [];
    let fieldGroup: any[] = [];

    // Itera sobre las columnas de la tabla
    this.tableColumns.forEach((column, index) => {
      // Crea un campo de ngx-formly para cada columna
      const field = {
        key: column.dataKey, // Usa el dataKey como clave del campo
        type: 'input', // Tipo de campo, puedes personalizar según tus necesidades
        className: index % 2 === 0 ? 'col-6' : 'col-6', // Alterna entre columnas de 6 y 3 basado en el índice
        templateOptions: {
          label: column.name, // Nombre de la columna como etiqueta del campo
          placeholder: column.name, // Nombre de la columna como marcador de posición del campo
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
        key: column.dataKey, // Usa el dataKey como clave del campo
        type: 'input', // Tipo de campo, puedes personalizar según tus necesidades
        templateOptions: {
          label: column.name, // Nombre de la columna como etiqueta del campo
          placeholder: column.name, // Nombre de la columna como marcador de posición del campo
          required: false, // Puedes definir la propiedad requerida según tus necesidades
        },
      };

      // Agrega el campo al array de campos de ngx-formly
      formlyFields.push(field);
    });

    return formlyFields;
  }


}
