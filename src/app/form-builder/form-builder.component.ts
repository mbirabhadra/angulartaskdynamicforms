// src/app/form-builder/form-builder.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilderService } from '../form-builder.service';
import { FormDefinition, FormField } from '../form-definition';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormGroupComponent } from '../form-group/form-group.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-form-builder',
    standalone: true,
    imports: [ReactiveFormsModule, FormGroupComponent, CommonModule],
    template: `
        <form [formGroup]="form">
            <div *ngFor="let groupName of groupNames" class="form-group">
                <h2>{{groupName}}</h2>
                 <app-form-group [fields]="getFieldsByGroup(groupName)" [form]="form"></app-form-group>
            </div>
            <button (click)="saveForm()" [disabled]="form.invalid">Save</button>
        </form>
    `,
})
export class FormBuilderComponent implements OnInit {
    formDefinition?: FormDefinition;
    groupNames: string[] = [];
    form!: FormGroup
    formData: any = {};
    
    constructor(
        private formBuilderService: FormBuilderService,
        private fb: FormBuilder
    ) { }
    
    ngOnInit(): void {
        this.formBuilderService.loadFormDefinition().subscribe(formDefinition => {
            this.formDefinition = formDefinition
            this.groupNames = Array.from(new Set(formDefinition.map(field => field.group)))
            
            const formControls = formDefinition.reduce((acc: any, field: FormField) => {
                acc[field.name] = ['']
                return acc;
            }, {})

            this.form = this.fb.group(formControls);

        })
    }

    getFieldsByGroup(groupName: string): FormField[] {
    return this.formDefinition?.filter(field => field.group === groupName) || [];
  }

    saveForm() {
        console.log("Form Values: ", this.form.value)
        this.formData = this.form.value
        console.log("Saved form data:", this.formData);
    }
}