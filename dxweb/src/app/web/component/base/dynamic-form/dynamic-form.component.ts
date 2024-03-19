import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { filter, Observable, Subject, takeUntil } from 'rxjs';
import { Field } from './dynamic-fields/models/field.model';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
})
export class DynamicFormComponent implements OnInit {
  @Input() fieldset$ = new Observable<Field[]>();
  fieldset: Field[] = [];

  public form!: FormGroup;
  unsubscribe$ = new Subject<void>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.fieldset$
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((f) => f.length > 0)
      )
      .subscribe((fieldSet) => {
        this.fieldset = fieldSet;
        console.log('fieldSet *******************', fieldSet);
        this.initializeForm();
      });
  }

  initializeForm(): void {
    this.form = this.formBuilder.group({});

    this.fieldset.forEach((field) => {
      console.log('field.controlName', field.controlName);
      this.form.addControl(field.controlName, this.initializeFormControl(), {
        emitEvent: false,
      });
    });
  }

  initializeFormControl(): FormControl {
    return this.formBuilder.control('');
  }
}
