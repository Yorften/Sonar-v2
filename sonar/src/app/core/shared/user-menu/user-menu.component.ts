import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../shared/models/user.model';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../features/auth/state/auth.reducer';
import { AuthActions } from '../../../features/auth/state/auth.actions';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html'
})
export class UserMenuComponent {

  user$: Observable<User | null> = this.store.select(selectUser);

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(AuthActions.loadUser());
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
