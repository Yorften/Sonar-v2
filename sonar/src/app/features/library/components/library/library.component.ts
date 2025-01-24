import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Track } from '../../../track/state/track.model';
import { TrackActions } from '../../../track/state/track.actions';
import { Observable } from 'rxjs';
import { selectActiveTrack, selectAll, selectMessage, selectStatus, selectTrackAudio } from '../../../track/state/track.reducer';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})
export class LibraryComponent {

  isOpen: boolean = false;
  tracks$: Observable<Track[]> = this.store.select(selectAll);
  status$: Observable<string> = this.store.select(selectStatus);
  error$: Observable<string | null> = this.store.select(selectMessage);
  activeTrack$: Observable<Track | null> = this.store.select(selectActiveTrack);
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
