import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CoreModule } from './core/core.module';
import { TrackModule } from './features/track/track.module';
import { PlaylistModule } from './features/playlist/playlist.module';
import { LibraryModule } from './features/library/library.module';
import { HomeModule } from './features/home/home.module';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CoreModule,
    HomeModule,
    TrackModule,
    PlaylistModule,
    LibraryModule,
    BrowserModule,
    AppRoutingModule,
    RouterLink,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
