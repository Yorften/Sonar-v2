import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Album } from '../../../../shared/models/album.model';
import { selectAll, selectMessage, selectStatus } from '../../state/album.reducer';
import { User } from '../../../../shared/models/user.model';
import { selectUser } from '../../../auth/state/auth.reducer';
import { AlbumActions } from '../../state/album.actions';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html'
})
export class AlbumComponent {

  isOpen: boolean = false;
  albums$: Observable<Album[]> = this.store.select(selectAll);
  status$: Observable<string> = this.store.select(selectStatus);
  error$: Observable<string | null> = this.store.select(selectMessage);
  user$: Observable<User | null> = this.store.select(selectUser);
  isAdmin$: Observable<boolean> = this.user$.pipe(
    map(user => user?.roles?.some(r => r.name === 'ROLE_ADMIN') ?? false)
  );

  constructor(private store: Store) { }

  editAlbum(album: Album) {
    this.isOpen = !this.isOpen
    this.store.dispatch(AlbumActions.editAlbum({ album: album }));
  }

  closeAlbumForm() {
    this.isOpen = false;
  }

  ngOnInit() {
    this.store.dispatch(AlbumActions.loadAlbums());
  }

}
