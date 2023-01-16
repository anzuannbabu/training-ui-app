import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ChartData {
  revenue: number;
  date: string | Date;
}

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  constructor(private http: HttpClient) {}

  get():Observable<ChartData[]> {
    return this.http.get<ChartData[]>('/assets/data.json');
  }
}
