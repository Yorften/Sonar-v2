import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryRoutingModule } from './library-routing.module';
import { LibraryComponent } from './components/library/library.component';
import { ButtonPrimaryComponent } from '../../shared/components/button-primary/button-primary.component';
import { TrackFormComponent } from '../../shared/components/track-form/track-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TrackSettingsComponent } from './components/track-settings/track-settings.component';
import { TrackCoversPopupComponent } from './components/track-covers-popup/track-covers-popup.component';
import { TrackFilesPopupComponent } from './components/track-files-popup/track-files-popup.component';
import { SharedModule } from '../../shared/shared.module';
import { MiniPlayerComponent } from '../../shared/components/mini-player/mini-player.component';
import { TrackCoverComponent } from '../../shared/components/track-cover/track-cover.component';


@NgModule({
  declarations: [
    LibraryComponent,
    ButtonPrimaryComponent,
    TrackFormComponent,
    TrackSettingsComponent,
    TrackCoversPopupComponent,
    TrackFilesPopupComponent,
    MiniPlayerComponent,
    TrackCoverComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    LibraryRoutingModule,
    ReactiveFormsModule,
  ]
})
export class LibraryModule { }
