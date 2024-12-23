// src/app/form-group/form-group.component.ts
import { Component, Input } from '@angular/core';
import { FormField } from '../form-definition';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormBuilderService } from '../form-builder.service';
import { FormFieldComponent } from '../form-field/form-field.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-group',
  standalone: true,
  imports: [FormFieldComponent, CommonModule],
  template: `
        <div *ngFor="let field of fields" class="form-field" >
            <div *ngIf="isVisible(field)">
                <app-form-field [field]="field" [form]="form"></app-form-field>
            </div>
        </div>
    `,
})
export class FormGroupComponent {
    @Input() fields: FormField[] = [];
    @Input() form!: FormGroup

    constructor(private formBuilderService: FormBuilderService){}
    isVisible(field: FormField) {
        return this.formBuilderService.evaluateCondition(field, this.form.value);
    }
}