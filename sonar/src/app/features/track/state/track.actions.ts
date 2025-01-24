import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Track } from './track.model';
import { StoredFile } from '../../../core/services/file/file.service';

export const TrackActions = createActionGroup({
  source: 'Track/API',
  events: {
    'Upload Track Files': props<{ trackFile: File; coverFile: File | null, trackId: string }>(),
    'Upload Track Files Success': emptyProps(),
    'Upload Track Files Failure': props<{ error: string }>(),

    'Upload Track File': props<{ file: StoredFile }>(),
    'Upload Track File Success': props<{ file: StoredFile }>(),
    'Upload Track File Failure': props<{ error: string }>(),
    'Upload Track Cover': props<{ file: StoredFile }>(),
    'Upload Track Cover Success': props<{ file: StoredFile }>(),
    'Upload Track Cover Failure': props<{ error: string }>(),


    'Load Track Audio': props<{ trackId: string }>(),
    'Load Track Audio Success': props<{ file: StoredFile }>(),
    'Load Track Audio Failure': props<{ error: string }>(),
    'Load Track Cover': props<{ trackId: string }>(),
    'Load Track Cover Success': props<{ file: StoredFile | null }>(),
    'Load Track Cover Failure': props<{ error: string }>(),

    'Load Track Audios': props<{ trackId: string }>(),
    'Load Track Audios Success': props<{ files: StoredFile[] }>(),
    'Load Track Audios Failure': props<{ error: string }>(),
    'Load Track Covers': props<{ trackId: string }>(),
    'Load Track Covers Success': props<{ files: StoredFile[] | [] }>(),
    'Load Track Covers Failure': props<{ error: string }>(),

    'Edit Track': props<{ track: Track }>(),
    'Clear Edited Track': emptyProps(),

    'Load Tracks': emptyProps(),
    'Load Tracks Success': props<{ tracks: Track[] }>(),
    'Load Tracks Failure': props<{ error: string }>(),
    'Add Track': props<{ track: Track }>(),
    'Add Track Success': props<{ track: Track }>(),
    'Add Track Failure': props<{ error: string }>(),
    'Update Track': props<{ track: Update<Track> }>(),
    'Update Track Success': props<{ track: Update<Track> }>(),
    'Update Track Failure': props<{ error: string }>(),
    'Delete Track': props<{ id: string }>(),
    'Delete Track Success': props<{ id: string }>(),
    'Delete Track Failure': props<{ error: string }>(),

    'Search Tracks': props<{ name: string }>(),
    'Search Tracks Success': props<{ tracks: Track[] }>(),
    'Search Tracks Failure': props<{ error: string }>(),

    'Play Track': props<{ track: Track }>(),
    'Clear Track': emptyProps(),
    'Load Track History': props<{ track: Track }>(),

  }
});
