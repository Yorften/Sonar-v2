import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Playlist } from './playlist.model';
import { PlaylistActions } from './playlist.actions';

export const playlistsFeatureKey = 'playlists';

export interface State extends EntityState<Playlist> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Playlist> = createEntityAdapter<Playlist>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(PlaylistActions.addPlaylist,
    (state, action) => adapter.addOne(action.playlist, state)
  ),
  on(PlaylistActions.upsertPlaylist,
    (state, action) => adapter.upsertOne(action.playlist, state)
  ),
  on(PlaylistActions.addPlaylists,
    (state, action) => adapter.addMany(action.playlists, state)
  ),
  on(PlaylistActions.upsertPlaylists,
    (state, action) => adapter.upsertMany(action.playlists, state)
  ),
  on(PlaylistActions.updatePlaylist,
    (state, action) => adapter.updateOne(action.playlist, state)
  ),
  on(PlaylistActions.updatePlaylists,
    (state, action) => adapter.updateMany(action.playlists, state)
  ),
  on(PlaylistActions.deletePlaylist,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(PlaylistActions.deletePlaylists,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(PlaylistActions.loadPlaylists,
    (state, action) => adapter.setAll(action.playlists, state)
  ),
  on(PlaylistActions.clearPlaylists,
    state => adapter.removeAll(state)
  ),
);

export const playlistsFeature = createFeature({
  name: playlistsFeatureKey,
  reducer,
  extraSelectors: ({ selectPlaylistsState }) => ({
    ...adapter.getSelectors(selectPlaylistsState)
  }),
});

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = playlistsFeature;
