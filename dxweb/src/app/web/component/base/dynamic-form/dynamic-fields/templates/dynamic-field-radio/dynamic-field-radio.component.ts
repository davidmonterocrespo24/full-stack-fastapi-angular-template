import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Field } from '../../models/field.model';

@Component({
  selector: 'app-dynamic-field-radio',
  templateUrl: './dynamic-field-radio.component.html',
  styleUrls: ['./dynamic-field-radio.component.css']
})
export class DynamicFieldRadioComponent implements OnInit {
  @Input() field!: Field;
  @Input() control!: FormControl;

  dynamicForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {

    this.dynamicForm = this.control.parent as FormGroup;
  }

}
