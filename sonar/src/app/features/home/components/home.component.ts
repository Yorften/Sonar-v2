import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { selectActiveTrack, selectMessage, selectStatus, selectTrackHistory } from '../../track/state/track.reducer';
import { Track } from '../../track/state/track.model';
import { Store } from '@ngrx/store';
import { TrackActions } from '../../track/state/track.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  isOpen: boolean = false;
  tracks$: Observable<Track[]> = this.store.select(selectTrackHistory);
  status$: Observable<string> = this.store.select(selectStatus);
  error$: Observable<string | null> = this.store.select(selectMessage);
  activeTrack$: Observable<Track | null> = this.store.select(selectActiveTrack);

  constructor(private store: Store) { }

  play(track: Track) {
    this.store.dispatch(TrackActions.clearTrack());
    this.store.dispatch(TrackActions.playTrack({ track: track }));
  }

  ngOnInit() {
    this.store.dispatch(TrackActions.loadTracks());
  }

}
