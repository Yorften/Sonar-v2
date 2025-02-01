import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Album } from '../../../shared/models/album.model';

export const AlbumActions = createActionGroup({
  source: 'Album/API',
  events: {
    'Load Albums': props<{ albums: Album[] }>(),
    'Add Album': props<{ album: Album }>(),
    'Upsert Album': props<{ album: Album }>(),
    'Add Albums': props<{ albums: Album[] }>(),
    'Upsert Albums': props<{ albums: Album[] }>(),
    'Update Album': props<{ album: Update<Album> }>(),
    'Update Albums': props<{ albums: Update<Album>[] }>(),
    'Delete Album': props<{ id: string }>(),
    'Delete Albums': props<{ ids: string[] }>(),
    'Clear Albums': emptyProps(),
  }
});
