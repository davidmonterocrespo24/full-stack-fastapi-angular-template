import { FieldTypeEnum } from '../enums/field-type.enum';

export interface Field {
  controlName: string;
  label: string;
  type: FieldTypeEnum;
  options: FieldOption[];
  disabled: boolean;
}

export interface FieldOption {
  value: string;
  viewValue: string;
}
