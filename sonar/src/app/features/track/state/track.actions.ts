import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Track } from '../../../shared/models/track.model';

export const TrackActions = createActionGroup({
  source: 'Track/API',
  events: {
    'Load Track Audio': props<{ audioFileId: string }>(),
    'Load Track Audio Success': props<{ file: Blob }>(),
    'Load Track Audio Failure': props<{ error: string }>(),
    'Load Track Cover': props<{ coverFileId: string }>(),
    'Load Track Cover Success': props<{ file: Blob | null }>(),
    'Load Track Cover Failure': props<{ error: string }>(),


    'Edit Track': props<{ track: Track }>(),
    'Clear Edited Track': emptyProps(),


    'Load Tracks': emptyProps(),
    'Load Tracks Success': props<{ tracks: Track[] }>(),
    'Load Tracks Failure': props<{ error: string }>(),

    'Add Track': props<{ formData: FormData }>(),
    'Add Track Success': props<{ track: Track }>(),
    'Add Track Failure': props<{ error: string }>(),

    'Update Track': props<{ formData: FormData, id: string }>(),
    'Update Track Success': props<{ track: Update<Track> }>(),
    'Update Track Failure': props<{ error: string }>(),

    'Delete Track': props<{ id: string }>(),
    'Delete Track Success': props<{ id: string }>(),
    'Delete Track Failure': props<{ error: string }>(),

    'Search Tracks': props<{ title: string }>(),
    'Search Tracks Success': props<{ tracks: Track[] }>(),
    'Search Tracks Failure': props<{ error: string }>(),

    'Play Track': props<{ track: Track }>(),
    'Clear Track': emptyProps(),
    'Load Track History': props<{ track: Track }>(),

  }
});
