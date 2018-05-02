
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatListModule,
  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatGridListModule,
  MatButtonModule,
  MatInputModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatSidenavModule,
  MatTabsModule,
} from '@angular/material';

@NgModule({
  imports: [ CommonModule ],
  declarations: [],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatGridListModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTabsModule,
  ]
})
export class SharedModule { }

