import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Field } from '../../models/field.model';

@Component({
  selector: 'app-dynamic-field-number',
  templateUrl: './dynamic-field-number.component.html',
  styleUrls: ['./dynamic-field-number.component.css']
})
export class DynamicFieldNumberComponent implements OnInit {
  @Input() field!: Field;
  @Input() control!: FormControl;

  constructor() { }

  ngOnInit(): void {
  }

}
