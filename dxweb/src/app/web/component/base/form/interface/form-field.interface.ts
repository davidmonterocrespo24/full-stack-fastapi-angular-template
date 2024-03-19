// form-field.interface.ts
export interface FormField {
    key: string; // key to bind the form control
    label: string; // label for the form field
    type: 'text' | 'number' | 'email' | 'textarea'| 'password'| 'select'; // type of the form field
    required?: boolean; // whether the field is required or not
    defaultValue?: any; // default value for the field
  }
  