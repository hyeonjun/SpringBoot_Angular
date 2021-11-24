import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from './member';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private serverUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getUsers(): Observable<Member[]> {
      return this.http.get<Member[]>(`${this.serverUrl}/member/all`);
  }

  public addUsers(member : Member): Observable<Member> {
      return this.http.post<Member>(`${this.serverUrl}/member/join`, member);
  }

  public updateUsers(member : Member): Observable<Member> {
      return this.http.put<Member>(`${this.serverUrl}/member/update`, member);
  }

  public deleteUsers(userid : string): Observable<void> {
      return this.http.delete<void>(`${this.serverUrl}/member/delete/${userid}`);
  }
}


