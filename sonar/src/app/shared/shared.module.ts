import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeFormatPlayerPipe } from './pipes/time-format-player.pipe';
import { TimeFormatPipe } from './pipes/time-format.pipe';
import { ButtonPrimaryComponent } from './components/button-primary/button-primary.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AlbumFormComponent } from './components/album-form/album-form.component';
import { TrackFormComponent } from './components/track-form/track-form.component';


@NgModule({
  declarations: [TimeFormatPlayerPipe, TimeFormatPipe, ButtonPrimaryComponent, AlbumFormComponent, TrackFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [TimeFormatPlayerPipe, TimeFormatPipe, ButtonPrimaryComponent, AlbumFormComponent, TrackFormComponent]
})
export class SharedModule { }
