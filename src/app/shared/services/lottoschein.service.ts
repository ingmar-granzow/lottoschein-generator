import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Lottoschein } from '../models/lottoschein.interface';

@Injectable({ providedIn: 'root' })
export class LottoscheinService {
  constructor(private http: HttpClient) {}

  baseUrl = 'http://0.0.0.0:3000/';

  getLotteryTickets() {
    return this.http.get<Lottoschein[]>(this.baseUrl + 'lottery-tickets');
  }

  save(lottoschein: Lottoschein): Observable<Lottoschein> {
    return this.http.post<Lottoschein>(this.baseUrl + 'lottery-tickets', lottoschein);
  }
}
