import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestResponse } from '../../models/service.model';
import { API_BASE_URL } from '../../tokens/api-url.token';
import { ISpecies } from '../../models';

type CreateSpeciesInput = Pick<ISpecies, 'level' | 'name' | 'skill'>;

@Injectable({
  providedIn: 'root',
})
export class SpeciesService {
  private apiUrl!: string;

  private http = inject(HttpClient);

  constructor(@Inject(API_BASE_URL) private baseUrl: string) {
    this.apiUrl = `${this.baseUrl}/species`;
  }

  list() {
    return this.http.get<RequestResponse<ISpecies[]>>(`${this.apiUrl}`);
  }

  find(id: string) {
    return this.http.get<RequestResponse<ISpecies>>(`${this.apiUrl}/${id}`);
  }

  create(body: CreateSpeciesInput): Observable<RequestResponse<ISpecies>> {
    return this.http.post<RequestResponse<ISpecies>>(`${this.apiUrl}`, body);
  }

  update(
    id: string,
    body: Partial<CreateSpeciesInput>,
  ): Observable<RequestResponse<ISpecies>> {
    return this.http.put<RequestResponse<ISpecies>>(
      `${this.apiUrl}/${id}`,
      body,
    );
  }

  delete(id: string) {
    return this.http.delete<RequestResponse<ISpecies>>(`${this.apiUrl}/${id}`);
  }
}
