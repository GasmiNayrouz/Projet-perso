import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../modeles/user.model';
import { Role } from '../modeles/Role';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://146.59.237.231:8096';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  deleteUser(id: number): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/users/${id}`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`);
  }

  getRoleById(id: number): Observable<Role> {
    return this.http.get<Role>(`${this.baseUrl}/roles/${id}`);
  }

  allRole(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.baseUrl}/roles`);
  }

createUser(user: { username: string; password: string; appUserRole: string }): Observable<User> {

  return this.http.post<User>(`${this.baseUrl}/users`, user);
}

  updateUser(user: User): Observable<Object> {
    return this.http.put(`${this.baseUrl}/users/${user.id}`, user);
  }

  saveRole(data: any): Observable<Object> {
    return this.http.post(`${this.baseUrl}/roles`, data);
  }

  updateRole(role: Role): Observable<Object> {
    return this.http.put(`${this.baseUrl}/roles/${role.id}`, role);
  }

  deleteRole(id: number): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/roles/${id}`);
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.baseUrl}/roles`);
  }
}
