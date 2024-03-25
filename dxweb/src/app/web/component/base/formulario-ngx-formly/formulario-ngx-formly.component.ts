import { Component, Inject, Input,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-formulario-ngx-formly',
  templateUrl: './formulario-ngx-formly.component.html',
  styleUrls: ['./formulario-ngx-formly.component.sass']
})
export class FormularioNgxFormlyComponent implements OnInit {
  @Input() formFields: FormlyFieldConfig[] = [];
  @Input() rowData: any;

  form = new FormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[] = [];
  options: FormlyFormOptions = {};
  constructor(private router: Router,
    private route: ActivatedRoute) { }
  

  ngOnInit(): void {
    this.fields = this.formFields;
    this.model = this.rowData;
  }

  submit() {
    // Aquí puedes manejar la lógica para enviar el formulario
    console.log('Formulario enviado', this.model);
  }
  discardForm() {
    this.router.navigate(['../'], { relativeTo: this.route });

  }
}
