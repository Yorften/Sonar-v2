import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackRoutingModule } from './track-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromTrack from './state/track.reducer';
import { TrackEffects } from './state/track.effects';
import { TrackComponent } from './components/track/track.component';


@NgModule({
  declarations: [
    TrackComponent,
  ],
  imports: [
    CommonModule,
    TrackRoutingModule,
    StoreModule.forFeature(fromTrack.tracksFeatureKey, fromTrack.reducer),
    EffectsModule.forFeature([TrackEffects]),
  ]
})
export class TrackModule { }
