import { Inject, inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '../../tokens/api-url.token';
import { HttpClient } from '@angular/common/http';
import { ICombats, RequestResponse } from '../../models';
import { Observable } from 'rxjs';

type CreateCombatInput = Pick<ICombats, 'winnerId' | 'loserId'>;

@Injectable({
  providedIn: 'root',
})
export class CombatsService {
  private apiUrl!: string;

  private http = inject(HttpClient);

  constructor(@Inject(API_BASE_URL) private baseUrl: string) {
    this.apiUrl = `${this.baseUrl}/combats`;
  }

  list() {
    return this.http.get<RequestResponse<ICombats[]>>(`${this.apiUrl}`);
  }

  find(id: string) {
    return this.http.get<RequestResponse<ICombats>>(`${this.apiUrl}/${id}`);
  }

  create(body: CreateCombatInput): Observable<RequestResponse<ICombats>> {
    return this.http.post<RequestResponse<ICombats>>(`${this.apiUrl}`, body);
  }
}
