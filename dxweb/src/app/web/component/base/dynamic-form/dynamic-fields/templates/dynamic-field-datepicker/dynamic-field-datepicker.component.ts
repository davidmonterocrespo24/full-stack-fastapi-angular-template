import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Field } from '../../models/field.model';

@Component({
  selector: 'app-dynamic-field-datepicker',
  templateUrl: './dynamic-field-datepicker.component.html',
  styleUrls: ['./dynamic-field-datepicker.component.css']
})
export class DynamicFieldDatepickerComponent implements OnInit {
  @Input() field!: Field;
  @Input() control!: FormControl;
  
  constructor() { }

  ngOnInit(): void {
  }

}
