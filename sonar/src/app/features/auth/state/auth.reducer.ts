// auth.reducer.ts
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { User } from '../../../shared/models/user.model';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: User | null;
  jwt: string | null;
  isAuthenticated: boolean;
  error: 'error' | 'success' | null;
}

function getInitialUser(): User | null {
  if (typeof localStorage !== 'undefined') {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  }
  return null;
}

function getInitialJwt(): string | null {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem('accessToken');
  }
  return null;
}

export const initialAuthState: AuthState = {
  user: getInitialUser(),
  jwt: getInitialJwt(),
  isAuthenticated: getInitialJwt() !== null,
  error: null,
};


export const reducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state) => ({
    ...state,
    error: null
  })),
  on(AuthActions.loginSuccess, (state, { accessToken, user }) => ({
    ...state,
    jwt: accessToken,
    isAuthenticated: true,
    user: user,
    error: null
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    jwt: null,
    isAuthenticated: false,
    error: error
  })),
  on(AuthActions.register, (state) => ({
    ...state,
    error: null
  })),
  on(AuthActions.registerSuccess, (state, { error }) => ({
    ...state,
    error: error
  })),
  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    error: error
  })),
  on(AuthActions.logoutSuccess, (state) => ({
    ...state,
    user: null,
    jwt: null,
    isAuthenticated: false,
    error: null
  })),
  on(AuthActions.logoutFailure, (state, { error }) => ({
    ...state,
    error: error
  }))
);


// Create a feature selector using NgRx’s createFeature API.
export const authFeature = createFeature({
  name: authFeatureKey,
  reducer: reducer,
  extraSelectors: ({ selectAuthState }) => ({
    selectUser: createSelector(
      selectAuthState,
      (state: AuthState) => state.user
    ),
    selectJwt: createSelector(
      selectAuthState,
      (state: AuthState) => state.jwt
    ),
    selectIsAuthenticated: createSelector(
      selectAuthState,
      (state: AuthState) => state.isAuthenticated
    ),
    selectError: createSelector(
      selectAuthState,
      (state: AuthState) => state.error
    ),
  }),
});

// Optionally, you can export the feature selector for the whole state.
export const { selectAuthState, selectUser, selectJwt, selectIsAuthenticated, selectError } = authFeature;
