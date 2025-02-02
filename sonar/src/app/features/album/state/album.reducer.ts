import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Album } from '../../../shared/models/album.model';
import { AlbumActions } from './album.actions';
import { Track } from '../../../shared/models/track.model';

export const albumsFeatureKey = 'albums';

export interface State extends EntityState<Album> {
  message: string | null;
  status: 'pending' | 'loading' | 'success' | 'error';
  editedAlbum: Album | null;
  error: string | null;
  album: Album | null;
  tracks: Track[] | [];
}

export const adapter: EntityAdapter<Album> = createEntityAdapter<Album>();

export const initialState: State = adapter.getInitialState({
  message: null,
  status: 'pending',
  editedAlbum: null,
  error: null,
  album: null,
  tracks: [],
});

export const reducer = createReducer(
  initialState,
  on(AlbumActions.loadAlbums, (state) => ({
    ...state,
    status: 'loading' as const
  })),
  on(AlbumActions.loadAlbumsSuccess, (state, { albums }) => ({
    ...adapter.setAll(albums, state),
    status: 'success' as const,
    message: null
  })),
  on(AlbumActions.loadAlbumsFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    message: error
  })),

  on(AlbumActions.getAlbum, (state) => ({
    ...state,
    status: 'loading' as const
  })),
  on(AlbumActions.getAlbumSuccess, (state, { album }) => ({
    ...state,
    album: album,
    status: 'success' as const,
    message: null
  })),
  on(AlbumActions.getAlbumFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    message: error
  })),
  
  on(AlbumActions.getAlbumTracks, (state) => ({
    ...state,
    status: 'loading' as const
  })),
  on(AlbumActions.getAlbumTracksSuccess, (state, { tracks }) => ({
    ...state,
    tracks: tracks,
    status: 'success' as const,
    message: null
  })),
  on(AlbumActions.getAlbumTracksFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    message: error
  })),

  on(AlbumActions.editAlbum, (state, { album }) => ({
    ...state,
    editedAlbum: album
  })),
  on(AlbumActions.clearEditedAlbum, (state) => ({
    ...state,
    editedAlbum: null
  })),


  on(AlbumActions.addAlbum, (state) => ({
    ...state,
    status: 'loading' as const,
    messge: null,
  })
  ),
  on(AlbumActions.addAlbumSuccess, (state, action) => ({
    ...adapter.addOne(action.album, state),
    status: 'success' as const,
    messge: null,
  })),
  on(AlbumActions.addAlbumFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    message: error,
  })
  ),


  on(AlbumActions.updateAlbum, (state) => ({
    ...state,
    status: 'loading' as const,
    message: null,
  })
  ),
  on(AlbumActions.updateAlbumSuccess, (state, action) => ({
    ...adapter.updateOne(action.album, state),
    status: 'success' as const,
    message: null,
  })),
  on(AlbumActions.updateAlbumFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    message: error,
  })
  ),


  on(AlbumActions.deleteAlbum, (state) => ({
    ...state,
    status: 'loading' as const,
    message: null,
  })
  ),
  on(AlbumActions.deleteAlbumSuccess, (state, action) => ({
    ...adapter.removeOne(action.id, state),
    status: 'success' as const,
    message: null,
  })),
  on(AlbumActions.deleteAlbumFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    message: error,
  })
  ),


);

export const albumsFeature = createFeature({
  name: albumsFeatureKey,
  reducer,
  extraSelectors: ({ selectAlbumsState }) => ({
    ...adapter.getSelectors(selectAlbumsState),
    selectStatus: createSelector(
      selectAlbumsState,
      (state: State) => state.status
    ),
    selectMessage: createSelector(
      selectAlbumsState,
      (state: State) => state.message
    ),
    selectEditedAlbum: createSelector(
      selectAlbumsState,
      (state: State) => state.editedAlbum
    ),
    selectError: createSelector(
      selectAlbumsState,
      (state: State) => state.error
    ),
    selectAlbum: createSelector(
      selectAlbumsState,
      (state: State) => state.album
    ),
    selectTracks: createSelector(
      selectAlbumsState,
      (state: State) => state.tracks
    ),
  }),
});

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
  selectStatus,
  selectMessage,
  selectEditedAlbum,
  selectError,
  selectAlbum,
  selectTracks,
} = albumsFeature;
