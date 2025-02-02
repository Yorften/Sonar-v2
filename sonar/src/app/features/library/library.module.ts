import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryRoutingModule } from './library-routing.module';
import { LibraryComponent } from './components/library/library.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    LibraryComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    LibraryRoutingModule,
    ReactiveFormsModule,
  ]
})
export class LibraryModule { }
