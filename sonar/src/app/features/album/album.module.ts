import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromAlbum from './state/album.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AlbumEffects } from './state/album.effects';
import { AlbumComponent } from './components/album/album.component';
import { AlbumRoutingModule } from './album-routing.module';



@NgModule({
  declarations: [
    AlbumComponent
  ],
  imports: [
    CommonModule,
    AlbumRoutingModule,
    StoreModule.forFeature(fromAlbum.albumsFeatureKey, fromAlbum.reducer),
    EffectsModule.forFeature([AlbumEffects])
  ]
})
export class AlbumModule { }
