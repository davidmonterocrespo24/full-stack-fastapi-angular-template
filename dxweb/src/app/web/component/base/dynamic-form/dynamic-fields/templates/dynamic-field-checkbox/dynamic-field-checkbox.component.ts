import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Field } from "../../models/field.model";

@Component({
  selector: 'app-dynamic-field-checkbox',
  templateUrl: './dynamic-field-checkbox.component.html',
  styleUrls: ['./dynamic-field-checkbox.component.css']
})
export class DynamicFieldCheckboxComponent implements OnInit {

  @Input() field!: Field;
  @Input() control!: FormControl;

  constructor() { }

  ngOnInit(): void {
  }

}
