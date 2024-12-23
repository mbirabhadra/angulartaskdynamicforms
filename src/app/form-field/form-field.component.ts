// src/app/form-field/form-field.component.ts
import { Component, Input } from '@angular/core';
import { FormField } from '../form-definition';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
      <div [formGroup]="form">
        <label [for]="field.name">
        {{field.name}}
            <span *ngIf="isRequired(field)">*</span>
        </label>
        <ng-container [ngSwitch]="field.fieldtype">
            <input *ngSwitchCase="'text'" type="text"  [formControlName]="field.name" [id]="field.name" />
            <input *ngSwitchCase="'date'" type="date"  [formControlName]="field.name" [id]="field.name"/>
            <input *ngSwitchCase="'integer'" type="number" [formControlName]="field.name" [id]="field.name" />
            <select *ngSwitchCase="'boolean'" [formControlName]="field.name" [id]="field.name" >
                <option *ngFor="let option of field.selectList" [value]="option">{{option}}</option>
            </select>
        </ng-container>
        <div *ngIf="form.get(field.name)?.invalid && (form.get(field.name)?.dirty || form.get(field.name)?.touched)"
            class="error-message">
            <div *ngIf="form.get(field.name)?.errors?.['required']">
                {{field.name}} is required.
            </div>
        </div>
      </div>
  `,
})
export class FormFieldComponent {
  @Input() field!: FormField;
  @Input() form!: FormGroup;

  isRequired(field: FormField): boolean {
    return field.validator?.some(validator => validator.hasOwnProperty('required')) || false;
  }
}