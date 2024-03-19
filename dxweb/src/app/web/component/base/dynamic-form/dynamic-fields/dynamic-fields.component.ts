import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroupDirective,
  Validators,
} from '@angular/forms';

import { Subject } from 'rxjs';
import { FieldTypeEnum } from './enums/field-type.enum';
import { Field } from './models/field.model';
import { DynamicFieldCheckboxComponent } from './templates/dynamic-field-checkbox/dynamic-field-checkbox.component';
import { DynamicFieldDatepickerComponent } from './templates/dynamic-field-datepicker/dynamic-field-datepicker.component';
import { DynamicFieldNumberComponent } from './templates/dynamic-field-number/dynamic-field-number.component';
import { DynamicFieldRadioComponent } from './templates/dynamic-field-radio/dynamic-field-radio.component';
import { DynamicFieldSelectComponent } from './templates/dynamic-field-select/dynamic-field-select.component';
import { DynamicFieldTextComponent } from './templates/dynamic-field-text/dynamic-field-text.component';

@Component({
  selector: 'app-dynamic-fields',
  templateUrl: './dynamic-fields.component.html',
  styleUrls: ['./dynamic-fields.component.css'],
})
export class DynamicFieldsComponent implements OnInit {
  @ViewChild('dynamicField', { read: ViewContainerRef })
  formRef!: ViewContainerRef;

  @Input() field!: Field;

  fieldTypeEnum: typeof FieldTypeEnum = FieldTypeEnum;
  control!: FormControl;
  formArray!: FormArray;
  private unsubscribe$ = new Subject();

  constructor(
    private formGroupDir: FormGroupDirective,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    if (this.field) {
      this.control = this.formGroupDir.control.get(
        this.field.controlName
      ) as FormControl;

      this.createFields();
    }
  }

  createFields(): void {
    switch (this.field.type) {
      case this.fieldTypeEnum.text: {
        const component = this.viewContainerRef.createComponent(
          DynamicFieldTextComponent
        );
        component.instance.field = this.field;
        component.instance.control = this.control;
        component.instance.control.addValidators(Validators.required);
        break;
      }
      case this.fieldTypeEnum.number: {
        const component = this.viewContainerRef.createComponent(
          DynamicFieldNumberComponent
        );
        component.instance.field = this.field;
        component.instance.control = this.control;
        component.instance.control.addValidators(Validators.min(1));
        break;
      }
      case this.fieldTypeEnum.radio: {
        const component = this.viewContainerRef.createComponent(
          DynamicFieldRadioComponent
        );
        component.instance.field = this.field;
        component.instance.control = this.control;
        break;
      }
      case this.fieldTypeEnum.select: {
        const component = this.viewContainerRef.createComponent(
          DynamicFieldSelectComponent
        );
        component.instance.field = this.field;
        component.instance.control = this.control;
        break;
      }
      case this.fieldTypeEnum.datepicker: {
        const component = this.viewContainerRef.createComponent(
          DynamicFieldDatepickerComponent
        );
        component.instance.field = this.field;
        component.instance.control = this.control;
        break;
      }
      case this.fieldTypeEnum.checkbox: {
        const component = this.viewContainerRef.createComponent(
          DynamicFieldCheckboxComponent
        );
        component.instance.field = this.field;
        component.instance.control = this.control;

        break;
      }

      default: {
        break;
      }
    }
  }
}
