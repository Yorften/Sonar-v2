import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Album } from '../../../shared/models/album.model';
import { Track } from '../../../shared/models/track.model';

export const AlbumActions = createActionGroup({
  source: 'Album/API',
  events: {
    'Load Albums': emptyProps(),
    'Load Albums Success': props<{ albums: Album[] }>(),
    'Load Albums Failure': props<{ error: string }>(),
    'Add Album': props<{ album: Album }>(),
    'Add Album Success': props<{ album: Album }>(),
    'Add Album Failure': props<{ error: string }>(),

    'Edit Album': props<{ album: Album }>(),
    'Clear Edited Album': emptyProps(),


    'Update Album': props<{ album: Update<Album> }>(),
    'Update Album Success': props<{ album: Update<Album> }>(),
    'Update Album Failure': props<{ error: string }>(),
    'Delete Album': props<{ id: string }>(),
    'Delete Album Success': props<{ id: string }>(),
    'Delete Album Failure': props<{ error: string }>(),

    'Get Album': props<{ id: string }>(),
    'Get Album Success': props<{ album: Album }>(),
    'Get Album Failure': props<{ error: string }>(),
  }
});
