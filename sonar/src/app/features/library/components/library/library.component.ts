import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Track } from '../../../../shared/models/track.model';
import { TrackActions } from '../../../track/state/track.actions';
import { map, Observable } from 'rxjs';
import { selectActiveTrack, selectAll, selectMessage, selectStatus } from '../../../track/state/track.reducer';
import { selectUser } from '../../../auth/state/auth.reducer';
import { User } from '../../../../shared/models/user.model';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html'
})
export class LibraryComponent {

  isOpen: boolean = false;
  tracks$: Observable<Track[]> = this.store.select(selectAll);
  status$: Observable<string> = this.store.select(selectStatus);
  error$: Observable<string | null> = this.store.select(selectMessage);
  activeTrack$: Observable<Track | null> = this.store.select(selectActiveTrack);
  user$: Observable<User | null> = this.store.select(selectUser);
  isAdmin$: Observable<boolean> = this.user$.pipe(
    map(user => user?.roles?.some(r => r.name === 'ROLE_ADMIN') ?? false)
  );
  openTrackId: string | null = null;


  constructor(private store: Store) { }

  play(track: Track) {
    this.store.dispatch(TrackActions.clearTrack());
    this.store.dispatch(TrackActions.playTrack({ track: track }));
    this.store.dispatch(TrackActions.loadTrackHistory({ track: track }));
  }

  ngOnInit() {
  }

  toggleMenu(trackId: string): void {
    this.openTrackId = this.openTrackId === trackId ? null : trackId;
  }

  closeMenu(): void {
    this.openTrackId = null;
  }

  closeTrackForm() {
    this.isOpen = false;
  }

  editTrack(track: Track) {
    this.store.dispatch(TrackActions.editTrack({ track }))
    this.isOpen = true;
  }

}
