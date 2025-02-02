import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import * as fromPlayer from './player/state/player.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PlayerEffects } from './player/state/player.effects';
import { PlayerComponent } from './player/components/player/player.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
// import { IndexedDbService } from './services/db/indexed-db.service';
import { AudioButtonComponent } from './player/components/audio-button/audio-button.component';
import { HomeComponent } from '../features/home/components/home.component'
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AlbumMenuComponent } from './shared/playlist-menu/album-menu.component';
import { UserMenuComponent } from './shared/user-menu/user-menu.component';

@NgModule({
  declarations: [
    SidebarComponent,
    PlayerComponent,
    AlbumMenuComponent,
    AudioButtonComponent,
    HomeComponent,
    UserMenuComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    RouterModule,
    StoreModule.forFeature(fromPlayer.playersFeatureKey, fromPlayer.reducer),
    EffectsModule.forFeature([PlayerEffects]),
  ],
  exports: [
    SidebarComponent,
    PlayerComponent,
    UserMenuComponent,
  ],
  providers: [

  ]
})
export class CoreModule { }
