import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../shared/models/user.model';
import { Role } from '../../../shared/models/role.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Sends a login request to the backend.
   * @param username The user's username.
   * @param password The user's password.
   * @returns An observable of the login response.
   */
  login(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/auth/login`;
    const payload = { username, password };
    return this.http.post(url, payload);
  }

  /**
   * Sends a registration request to the backend.
   * Uses the shared User model and always assigns the role "ROLE_USER".
   * @param user The user data to register.
   * @returns An observable of the registration response.
   */
  register(user: User): Observable<any> {
    // Ensure that the roles array contains ROLE_USER.
    const role: Role = {
      name: "ROLE_ADMIN"
    }
    const newUser: User = {
      ...user,
      roles: [role]
    };
    const url = `${this.apiUrl}/auth/register`;
    return this.http.post(url, newUser);
  }

  userInfo(): Observable<any> {
    const url = `${this.apiUrl}/users/@me`;
    return this.http.get(url);
  }
}
