import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryRoutingModule } from './library-routing.module';
import { LibraryComponent } from './components/library/library.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TrackSettingsComponent } from './components/track-settings/track-settings.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    LibraryComponent,
    TrackSettingsComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    LibraryRoutingModule,
    ReactiveFormsModule,
  ]
})
export class LibraryModule { }
