import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Album } from '../../../shared/models/album.model';
import { AlbumActions } from './album.actions';

export const albumsFeatureKey = 'albums';

export interface State extends EntityState<Album> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Album> = createEntityAdapter<Album>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(AlbumActions.addAlbum,
    (state, action) => adapter.addOne(action.album, state)
  ),
  on(AlbumActions.upsertAlbum,
    (state, action) => adapter.upsertOne(action.album, state)
  ),
  on(AlbumActions.addAlbums,
    (state, action) => adapter.addMany(action.albums, state)
  ),
  on(AlbumActions.upsertAlbums,
    (state, action) => adapter.upsertMany(action.albums, state)
  ),
  on(AlbumActions.updateAlbum,
    (state, action) => adapter.updateOne(action.album, state)
  ),
  on(AlbumActions.updateAlbums,
    (state, action) => adapter.updateMany(action.albums, state)
  ),
  on(AlbumActions.deleteAlbum,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(AlbumActions.deleteAlbums,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(AlbumActions.loadAlbums,
    (state, action) => adapter.setAll(action.albums, state)
  ),
  on(AlbumActions.clearAlbums,
    state => adapter.removeAll(state)
  ),
);

export const albumsFeature = createFeature({
  name: albumsFeatureKey,
  reducer,
  extraSelectors: ({ selectAlbumsState }) => ({
    ...adapter.getSelectors(selectAlbumsState)
  }),
});

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = albumsFeature;
