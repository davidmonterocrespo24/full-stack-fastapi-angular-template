import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Field } from '../../models/field.model';

@Component({
  selector: 'app-dynamic-field-select',
  templateUrl: './dynamic-field-select.component.html',
  styleUrls: ['./dynamic-field-select.component.css']
})
export class DynamicFieldSelectComponent implements OnInit {

  @Input() field!: Field;
  @Input() control!: FormControl;
  
  constructor() { }

  ngOnInit(): void {

    
  }

}
