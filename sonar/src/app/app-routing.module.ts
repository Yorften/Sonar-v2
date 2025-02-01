import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';
import { RegisterComponent } from './features/auth/components/register/register.component';

const routes: Routes = [

  { path: '', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) },
  { path: 'library', loadChildren: () => import('./features/library/library.module').then(m => m.LibraryModule) },
  { path: 'albums', loadChildren: () => import('./features/album/album.module').then(m => m.AlbumModule) },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
