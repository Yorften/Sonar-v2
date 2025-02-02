import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Track } from '../../../../shared/models/track.model';
import { Store } from '@ngrx/store';
import { selectAlbum, selectMessage, selectStatus } from '../../state/album.reducer';
import { Album } from '../../../../shared/models/album.model';
import { AlbumActions } from '../../state/album.actions';
import { ActivatedRoute } from '@angular/router';
import { selectActiveTrack, selectAll } from '../../../track/state/track.reducer';
import { TrackActions } from '../../../track/state/track.actions';
import { User } from '../../../../shared/models/user.model';
import { selectUser } from '../../../auth/state/auth.reducer';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html'
})
export class AlbumDetailComponent {

  isOpen: boolean = false;
  tracks$: Observable<Track[]> = this.store.select(selectAll);
  status$: Observable<string> = this.store.select(selectStatus);
  error$: Observable<string | null> = this.store.select(selectMessage);
  activeTrack$: Observable<Track | null> = this.store.select(selectActiveTrack);
  album$: Observable<Album | null> = this.store.select(selectAlbum);
  user$: Observable<User | null> = this.store.select(selectUser);
    isAdmin$: Observable<boolean> = this.user$.pipe(
      map(user => user?.roles?.some(r => r.name === 'ROLE_ADMIN') ?? false)
    );
  albumId: string | null = null;
  openTrackId: string | null = null;

  constructor(private store: Store, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.albumId = params.get('id');
      if (this.albumId) {
        this.store.dispatch(AlbumActions.getAlbum({ id: this.albumId }));

        this.store.dispatch(TrackActions.getAlbumTracks({ id: this.albumId }));
      }
    });
  }

  play(track: Track) {
    this.store.dispatch(TrackActions.clearTrack());
    this.store.dispatch(TrackActions.playTrack({ track: track }));
    this.store.dispatch(TrackActions.loadTrackHistory({ track: track }));
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
