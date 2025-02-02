import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../../shared/models/user.model';

type error = 'success' | 'error' | null ;

export const AuthActions = createActionGroup({
  source: 'User/API',
  events: {
    'Login': props<{ username: string, password: string }>(),
    'Login Success': props<{ accessToken: string }>(),
    'Login Failure': props<{ error: error }>(),
    'Register': props<{ user: User }>(),
    'Register Success': props<{ error: error }>(),
    'Register Failure': props<{ error: error }>(),
    'Load User': emptyProps(),
    'Load User Success': props<{ user: User }>(),
    'Load User Failure': props<{ error: error }>(),
    'Logout': emptyProps(),
    'Logout Success': emptyProps(),
    'Logout Failure': props<{ error: error }>()
  }
});
