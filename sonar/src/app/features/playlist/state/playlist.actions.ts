import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Playlist } from './playlist.model';

export const PlaylistActions = createActionGroup({
  source: 'Playlist/API',
  events: {
    'Load Playlists': props<{ playlists: Playlist[] }>(),
    'Add Playlist': props<{ playlist: Playlist }>(),
    'Upsert Playlist': props<{ playlist: Playlist }>(),
    'Add Playlists': props<{ playlists: Playlist[] }>(),
    'Upsert Playlists': props<{ playlists: Playlist[] }>(),
    'Update Playlist': props<{ playlist: Update<Playlist> }>(),
    'Update Playlists': props<{ playlists: Update<Playlist>[] }>(),
    'Delete Playlist': props<{ id: string }>(),
    'Delete Playlists': props<{ ids: string[] }>(),
    'Clear Playlists': emptyProps(),
  }
});
