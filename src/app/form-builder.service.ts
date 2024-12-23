// src/app/form-builder.service.ts
import { Injectable } from '@angular/core';
import { FormDefinition, FormField, Validator } from './form-definition';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormBuilderService {

  constructor() { }

  loadFormDefinition() {
    // sample form definition or JSON file or api
     const sampleFormDefinition: FormDefinition = [
        {
            "fieldtype": "text",
            "name": "Order No",
            "group": "General Information",
            "validator": [
                { "required": "true" }
            ]
        },
        {
            "fieldtype": "date",
            "name": "OrderedDate",
            "group": "General Information",
            "validator": [
                { "required": "true" }
            ]
        },
        {
            "fieldtype": "text",
            "name": "OrderedInfo",
            "group": "General Information",
            "validator": [
                { "required": "true" }
            ],
            "condition": "and",
            "rules": [
                {
                    "field": "OrderedDate",
                    "operator": "!=",
                    "value": ""
                }
            ]
        },
        {
            "fieldtype": "integer",
            "name": "Price",
            "group": "Product Information",
            "validator": [
                { "required": "true" }
            ]
        },
        {
            "fieldtype": "boolean",
            "name": "Refurbished",
            "group": "Product Information",
            "selectList": [
                "Yes",
                "No"
            ]
        },
        {
            "fieldtype": "text",
            "name": "Address",
            "group": "Product Information",
            "condition": "or",
            "rules": [
                {
                    "field": "Order No",
                    "operator": ">=",
                    "value": "100"
                },
                {
                    "field": "Price",
                    "operator": "<=",
                    "value": "100"
                }
            ]
        }
    ]

    return of(sampleFormDefinition)
    }

  evaluateCondition(field: FormField, formData: any) {
    if (!field.condition || !field.rules || field.rules.length === 0) {
      return true;
    }
    
    const results = field.rules.map(rule => {
      const fieldValue = formData[rule.field];
      if (fieldValue === undefined) return false; 
      try {
          return this.evaluateSingleCondition(fieldValue, rule.operator, rule.value);
        } catch (error) {
          return false; // if the evaluation of conditions fails.
        }
      
    });
    
    if (field.condition === 'and') {
        return results.every(result => result === true);
      } else if (field.condition === 'or') {
        return results.some(result => result === true);
      }
      return false;
    }

    private evaluateSingleCondition(fieldValue: any, operator: string, value: any): boolean {
      if(fieldValue === undefined) return false;

        switch (operator) {
            case '==':
            case '=':
              return fieldValue == value;
            case '!=':
              return fieldValue != value;
            case '>':
              return fieldValue > value;
            case '<':
              return fieldValue < value;
            case '>=':
              return fieldValue >= value;
            case '<=':
              return fieldValue <= value;
            default:
              return false;
          }
    }
}