import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Track } from '../../../features/track/state/track.model';

export const PlayerActions = createActionGroup({
  source: 'Player/API',
  events: {
    // Playback controls
    'Play': props<{ track: Track }>(),
    'Play Success': props<{ trackId: string }>(),
    'Play Failure': props<{ error: any }>(),
    'Pause': emptyProps(),
    'Next Track': emptyProps(),
    'Previous Track': emptyProps(),

    // Volume
    'Set Volume': props<{ volume: number }>(),
    'Toggle Mute': emptyProps(),

    // Track progress
    'Update Progress': props<{ currentTime: number; duration: number }>(),
    'Seek': props<{ time: number }>(),

    // Loading states
    'Load Track Media': props<{ track: Track }>(),
    'Load Track Media Success': props<{ audioUrl: string; coverUrl: string | null }>(),
    'Load Track Media Failure': props<{ error: any }>()
  }
});
