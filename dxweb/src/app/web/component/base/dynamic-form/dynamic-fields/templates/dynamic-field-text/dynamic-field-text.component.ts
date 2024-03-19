import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Field } from "../../models/field.model";


@Component({
  selector: "dynamic-field-text.component",
  templateUrl: "./dynamic-field-text.component.html",
  styleUrls: ["./dynamic-field-text.component.css"],
})
export class DynamicFieldTextComponent {
  @Input() field!: Field;
  @Input() control!: FormControl;

  constructor() {}

}
