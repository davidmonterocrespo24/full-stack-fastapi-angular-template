import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QueryBuilderConfig } from 'ngx-angular-query-builder';

@Component({
  selector: 'app-query-builder-dialog',
  templateUrl: './query-builder-dialog.component.html',
})
export class QueryBuilderDialogComponent {

  query: any;
  config: QueryBuilderConfig;

  constructor(
    public dialogRef: MatDialogRef<QueryBuilderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.config = data.config; // Obtener la configuración pasada desde el componente principal
    this.query = data.query; // Obtener la consulta pasada desde el componente principal
  }

  closeDialog(): void {
    this.dialogRef.close(this.query); // Pasar el objeto query al cerrar el diálogo
  }

}
