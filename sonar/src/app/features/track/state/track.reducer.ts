import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Track } from './track.model';
import { TrackActions } from './track.actions';
import { StoredFile } from '../../../core/services/file/file.service';

export const tracksFeatureKey = 'tracks';

export interface State extends EntityState<Track> {
  message: string | null;
  status: 'pending' | 'loading' | 'success' | 'error';
  editedTrack: Track | null;
  uploadStatus: 'idle' | 'uploading' | 'success' | 'error';
  uploadError: string | null;
  trackAudio: StoredFile | null;
  trackCover: StoredFile | null;
  trackAudios: StoredFile[];
  trackCovers: StoredFile[];
  loadTrackAudioStatus: 'idle' | 'loading' | 'success' | 'error';
  loadTrackCoverStatus: 'idle' | 'loading' | 'success' | 'error';
  loadFilesStatus: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;
  activeTrack: Track | null;
  trackHistory: Map<string, Track>;
}

export const adapter: EntityAdapter<Track> = createEntityAdapter<Track>();

export const initialState: State = adapter.getInitialState({
  message: null,
  status: 'pending',
  editedTrack: null,
  uploadStatus: 'idle',
  uploadError: null,
  trackAudio: null,
  trackCover: null,
  trackAudios: [],
  trackCovers: [],
  activeTrack: null,
  loadTrackAudioStatus: 'idle',
  loadTrackCoverStatus: 'idle',
  loadFilesStatus: 'idle',
  error: null,
  trackHistory: new Map<string, Track>()
});

export const reducer = createReducer(
  initialState,

  on(TrackActions.editTrack, (state, { track }) => ({
    ...state,
    editedTrack: track  // Destructure track from action payload
  })),
  on(TrackActions.clearEditedTrack, (state) => ({
    ...state,
    editedTrack: null  // Clear the track
  })),



  on(TrackActions.playTrack, (state, { track }) => ({
    ...state,
    activeTrack: track,
  })),
  on(TrackActions.clearTrack, (state) => ({
    ...state,
    activeTrack: null,
  })),
  on(TrackActions.loadTrackHistory, (state, { track }) => {
    let newHistory = new Map(state.trackHistory);
    const firstKey = newHistory.keys().next().value;

    if (newHistory.size >= 3) {
      if (track.id !== firstKey) {
        newHistory.delete(firstKey!);
      }
    }

    if (track.id === firstKey) {
      newHistory.delete(firstKey!);
    }
    newHistory.set(track.id, track);


    return {
      ...state,
      trackHistory: newHistory
    };
  }),



  on(TrackActions.loadTracks, (state) => ({
    ...state,
    status: 'loading' as const
  })),
  on(TrackActions.loadTracksSuccess, (state, { tracks }) => ({
    ...adapter.setAll(tracks, state),
    status: 'success' as const,
    message: null
  })),
  on(TrackActions.loadTracksFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    message: error
  })),


  on(TrackActions.searchTracks, (state) => ({
    ...state,
    status: 'loading' as const
  })),
  on(TrackActions.searchTracksSuccess, (state, { tracks }) => ({
    ...adapter.setAll(tracks, state),
    status: 'success' as const,
    message: null
  })),
  on(TrackActions.searchTracksFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    message: error
  })),




  on(TrackActions.uploadTrackFiles, (state) => ({
    ...state,
    uploadStatus: 'uploading' as const,
    uploadError: null,
  })),
  on(TrackActions.uploadTrackFilesSuccess, (state) => ({
    ...state,
    uploadStatus: 'success' as const,
    uploadError: null,
  })),
  on(TrackActions.uploadTrackFilesFailure, (state, { error }) => ({
    ...state,
    uploadStatus: 'error' as const,
    uploadError: error,
  })),



  on(TrackActions.uploadTrackFile, (state) => ({
    ...state,
    loadFilesStatus: 'loading' as const
  })),
  on(TrackActions.uploadTrackFileSuccess, (state, { file }) => ({
    ...state,
    loadFilesStatus: 'success' as const,
    trackAudios: [...state.trackAudios, file]
  })),
  on(TrackActions.uploadTrackFileFailure, (state, { error }) => ({
    ...state,
    loadFilesStatus: 'error' as const,
    error: error
  })),

  on(TrackActions.uploadTrackCover, (state) => ({
    ...state,
    loadFilesStatus: 'loading' as const
  })),
  on(TrackActions.uploadTrackCoverSuccess, (state, { file }) => ({
    ...state,
    loadFilesStatus: 'success' as const,
    trackCovers: [...state.trackCovers, file]
  })),
  on(TrackActions.uploadTrackCoverFailure, (state, { error }) => ({
    ...state,
    loadFilesStatus: 'error' as const,
    error: error
  })),


  on(TrackActions.loadTrackAudio, (state) => ({
    ...state,
    loadTrackAudioStatus: 'loading' as const
  })),
  on(TrackActions.loadTrackAudioSuccess, (state, { file }) => ({
    ...state,
    trackAudio: file,
    loadTrackAudioStatus: 'success' as const
  })),
  on(TrackActions.loadTrackAudioFailure, (state, { error }) => ({
    ...state,
    loadTrackAudioStatus: 'error' as const,
    error: error
  })),
  on(TrackActions.loadTrackCover, (state) => ({
    ...state,
    loadTrackCoverStatus: 'loading' as const
  })),
  on(TrackActions.loadTrackCoverSuccess, (state, { file }) => ({
    ...state,
    trackCover: file,
    loadTrackCoverStatus: 'success' as const
  })),
  on(TrackActions.loadTrackCoverFailure, (state, { error }) => ({
    ...state,
    error: error,
    loadTrackCoverStatus: 'error' as const,
  })),



  on(TrackActions.loadTrackAudios, (state) => ({
    ...state,
    loadFilesStatus: 'loading' as const
  })),
  on(TrackActions.loadTrackAudiosSuccess, (state, { files }) => ({
    ...state,
    trackAudios: files,
    loadFilesStatus: 'success' as const
  })),
  on(TrackActions.loadTrackAudiosFailure, (state, { error }) => ({
    ...state,
    loadFilesStatus: 'error' as const,
    error: error
  })),
  on(TrackActions.loadTrackCovers, (state) => ({
    ...state,
    loadFilesStatus: 'loading' as const
  })),
  on(TrackActions.loadTrackCoversSuccess, (state, { files }) => ({
    ...state,
    trackCovers: files,
    loadFilesStatus: 'success' as const
  })),
  on(TrackActions.loadTrackCoversFailure, (state, { error }) => ({
    ...state,
    error: error,
    loadFilesStatus: 'error' as const,
  })),



  on(TrackActions.addTrack, (state) => ({
    ...state,
    status: 'loading' as const,
    messge: null,
  })
  ),
  on(TrackActions.addTrackSuccess, (state, action) => ({
    ...adapter.addOne(action.track, state),
    status: 'success' as const,
    messge: null,
  })),
  on(TrackActions.addTrackFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    message: error,
  })
  ),


  on(TrackActions.updateTrack, (state) => ({
    ...state,
    status: 'loading' as const,
    message: null,
  })
  ),
  on(TrackActions.updateTrackSuccess, (state, action) => ({
    ...adapter.updateOne(action.track, state),
    status: 'success' as const,
    message: null,
  })),
  on(TrackActions.updateTrackFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    message: error,
  })
  ),


  on(TrackActions.deleteTrack, (state) => ({
    ...state,
    status: 'loading' as const,
    message: null,
  })
  ),
  on(TrackActions.deleteTrackSuccess, (state, action) => ({
    ...adapter.removeOne(action.id, state),
    status: 'success' as const,
    message: null,
  })),
  on(TrackActions.deleteTrackFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    message: error,
  })
  ),

);

export const tracksFeature = createFeature({
  name: tracksFeatureKey,
  reducer,
  extraSelectors: ({ selectTracksState }) => ({
    ...adapter.getSelectors(selectTracksState),
    selectStatus: createSelector(
      selectTracksState,
      (state: State) => state.status
    ),
    selectMessage: createSelector(
      selectTracksState,
      (state: State) => state.message
    ),
    selectEditedTrack: createSelector(
      selectTracksState,
      (state: State) => state.editedTrack
    ),
    selectUploadStatus: createSelector(
      selectTracksState,
      (state: State) => state.uploadStatus
    ),
    selectUploadError: createSelector(
      selectTracksState,
      (state: State) => state.uploadError
    ),
    selectTrackAudio: createSelector(
      selectTracksState,
      (state: State) => state.trackAudio
    ),
    selectTrackCover: createSelector(
      selectTracksState,
      (state: State) => state.trackCover
    ),
    selectTrackAudios: createSelector(
      selectTracksState,
      (state: State) => state.trackAudios
    ),
    selectTrackCovers: createSelector(
      selectTracksState,
      (state: State) => state.trackCovers
    ),
    selectTrackAudioStatus: createSelector(
      selectTracksState,
      (state: State) => state.loadTrackAudioStatus
    ),
    selectTrackCoverStatus: createSelector(
      selectTracksState,
      (state: State) => state.loadTrackCoverStatus
    ),
    selectLoadFilesStatus: createSelector(
      selectTracksState,
      (state: State) => state.loadFilesStatus
    ),
    selectActiveTrack: createSelector(
      selectTracksState,
      (state: State) => state.activeTrack
    ),
    selectError: createSelector(
      selectTracksState,
      (state: State) => state.error
    ),
    selectTrackHistory: createSelector(
      selectTracksState,
      (state: State) => Array.from(state.trackHistory.values()).reverse()
    ),

  }),
});

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
  selectTrackAudio,
  selectTrackCover,
  selectTrackAudios,
  selectTrackCovers,
  selectStatus,
  selectMessage,
  selectEditedTrack,
  selectUploadStatus,
  selectUploadError,
  selectTrackAudioStatus,
  selectTrackCoverStatus,
  selectLoadFilesStatus,
  selectActiveTrack,
  selectError,
  selectTrackHistory,
} = tracksFeature;
