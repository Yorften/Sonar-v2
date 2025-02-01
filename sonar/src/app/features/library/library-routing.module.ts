import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryComponent } from './components/library/library.component';
import { AuthGuard } from '../../core/auth.guard';

const routes: Routes = [
  { path: 'library', pathMatch: 'full', component: LibraryComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
