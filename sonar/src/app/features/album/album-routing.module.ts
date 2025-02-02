import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumComponent } from './components/album/album.component';
import { AuthGuard } from '../../core/auth.guard';
import { AlbumDetailComponent } from './components/album-detail/album-detail.component';

const routes: Routes = [
  { path: 'albums', pathMatch: 'full', component: AlbumComponent, canActivate: [AuthGuard] },
  { path: 'album/:id', component: AlbumDetailComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumRoutingModule { }
