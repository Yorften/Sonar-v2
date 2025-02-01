import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumComponent } from './components/album/album.component';
import { AuthGuard } from '../../core/auth.guard';

const routes: Routes = [
  { path: 'albums', pathMatch: 'full', component: AlbumComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumRoutingModule { }
