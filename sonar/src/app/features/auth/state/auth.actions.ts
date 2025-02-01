import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const AuthActions = createActionGroup({
  source: 'User/API',
  events: {
    'Login': props<{ username: string, password: string }>(),
    'Login Success': props<{ accessToken: string }>(),
    'Login Failure': props<{ error: string }>(),
    'Logout': emptyProps(),
    'Logout Success': emptyProps(),
    'Logout Failure': props<{ error: string }>()
  }
});
