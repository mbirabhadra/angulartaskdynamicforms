// src/app/app.component.ts
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilderComponent } from './form-builder/form-builder.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormBuilderComponent, ReactiveFormsModule],
  template: `
    <app-form-builder></app-form-builder>
  `
})
export class AppComponent {
}