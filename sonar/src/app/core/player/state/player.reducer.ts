import { createFeature, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { PlayerActions } from './player.actions';
import { Track } from '../../../features/track/state/track.model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const playersFeatureKey = 'player';

export interface PlayerState {
  currentTrack: Track | null;
  queue: Track[];
  isPlaying: boolean;
  audioUrl: string | null;
  coverUrl: string | null;
  status: 'idle' | 'loading' | 'playing' | 'paused' | 'error';
  message: string | null;
}

export const initialState: PlayerState = {
  currentTrack: null,
  queue: [],
  isPlaying: false,
  audioUrl: null,
  coverUrl: null,
  status: 'idle',
  message: null
};


export const reducer = createReducer(
  initialState,

  on(PlayerActions.play, (state, { track }) => ({
    ...state,
    currentTrack: track,
    status: 'loading' as const,
    isPlaying: true
  })),
  on(PlayerActions.playSuccess, (state, { trackId }) => ({
    ...state,
    currentTrack: state.queue.find(track => track.id === trackId) || null,
    status: 'playing' as const,
    isPlaying: true,
    message: null
  })),
  on(PlayerActions.playFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    message: error
  })),
  on(PlayerActions.pause, (state) => ({
    ...state,
    isPlaying: false,
    status: 'paused' as const
  })),



  on(PlayerActions.nextTrack, (state) => {
    const currentIndex = state.queue.findIndex(t => t.id === state.currentTrack?.id);
    const nextTrack = state.queue[currentIndex + 1] || null;
    return {
      ...state,
      currentTrack: nextTrack,
      status: nextTrack ? 'loading' as const : 'idle' as const
    };
  }),

  on(PlayerActions.previousTrack, (state) => {
    const currentIndex = state.queue.findIndex(t => t.id === state.currentTrack?.id);
    const previousTrack = state.queue[currentIndex - 1] || null;
    return {
      ...state,
      currentTrack: previousTrack,
      status: previousTrack ? 'loading' as const : 'idle' as const
    };
  }),

);

export const playerFeature = createFeature({
  name: playersFeatureKey,
  reducer,
  extraSelectors: ({ selectPlayerState }) => ({
    selectStatus: createSelector(
      selectPlayerState,
      (state: PlayerState) => state.status
    ),
    selectMessage: createSelector(
      selectPlayerState,
      (state: PlayerState) => state.message
    ),
    selectaudioUrl: createSelector(
      selectPlayerState,
      (state: PlayerState) => state.audioUrl
    ),
    selectCoverUrl: createSelector(
      selectPlayerState,
      (state: PlayerState) => state.coverUrl
    ),
    selectCurrentTrack: createSelector(
      selectPlayerState,
      (state: PlayerState) => state.currentTrack
    ),
    // selectCurrentTime: createSelector(
    //   selectPlayerState,
    //   (state: PlayerState) => state.currentTime
    // ),
    // selectDuration: createSelector(
    //   selectPlayerState,
    //   (state: PlayerState) => state.duration
    // ),
    // selectVolume: createSelector(
    //   selectPlayerState,
    //   (state: PlayerState) => state.volume
    // ),
    // selectIsMuted: createSelector(
    //   selectPlayerState,
    //   (state: PlayerState) => state.isMuted
    // ),
    selectIsPlaying: createSelector(
      selectPlayerState,
      (state: PlayerState) => state.isPlaying
    ),
    selectQueue: createSelector(
      selectPlayerState,
      (state: PlayerState) => state.queue
    ),
  }),
});

export const {
  selectStatus,
  selectMessage,
  selectaudioUrl,
  selectCoverUrl,
  selectCurrentTrack,
  // selectCurrentTime,
  // selectDuration,
  // selectVolume,
  // selectIsMuted,
  selectIsPlaying,
  selectQueue
} = playerFeature;
