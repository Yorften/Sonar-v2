import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TrackActions } from '../../../features/track/state/track.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  constructor(private store: Store) { }

  searchTracks($event: Event) {
    const element = $event.currentTarget as HTMLInputElement

    const value = element.value

    this.store.dispatch(TrackActions.searchTracks({ name: value }));
  }
}
