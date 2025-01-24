import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) },
  { path: 'library', loadChildren: () => import('./features/library/library.module').then(m => m.LibraryModule) },
  { path: 'playlsits', loadChildren: () => import('./features/playlist/playlist.module').then(m => m.PlaylistModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
