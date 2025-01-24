import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromPlaylist from './state/playlist.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PlaylistEffects } from './state/playlist.effects';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { PlaylistRoutingModule } from './playlist-routing.module';



@NgModule({
  declarations: [
    PlaylistComponent
  ],
  imports: [
    CommonModule,
    PlaylistRoutingModule,
    StoreModule.forFeature(fromPlaylist.playlistsFeatureKey, fromPlaylist.reducer),
    EffectsModule.forFeature([PlaylistEffects])
  ]
})
export class PlaylistModule { }
