import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromAlbum from './state/album.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AlbumEffects } from './state/album.effects';
import { AlbumComponent } from './components/album/album.component';
import { AlbumRoutingModule } from './album-routing.module';
import { AlbumDetailComponent } from './components/album-detail/album-detail.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    AlbumComponent,
    AlbumDetailComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    AlbumRoutingModule,
    StoreModule.forFeature(fromAlbum.albumsFeatureKey, fromAlbum.reducer),
    EffectsModule.forFeature([AlbumEffects])
  ]
})
export class AlbumModule { }
