// src/app/form-definition.ts

export interface Validator {
    [key: string]: string;
}
export interface Rule {
    field: string;
    operator: string;
    value: any;
  }
  
export interface FormField {
  fieldtype: 'text' | 'date' | 'integer' | 'boolean';
  name: string;
  group: string;
  validator?: Validator[];
  condition?: 'and' | 'or';
  rules?: Rule[];
  selectList?: string[];
}

export interface FormDefinition extends Array<FormField>{}