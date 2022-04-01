import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Lottoschein } from '../models/lottoschein.interface';
import { Distribution } from '../models/distribution.interface';

@Injectable({ providedIn: 'root' })
export class LottoscheinService {
  constructor(private http: HttpClient) {}

  baseUrl = 'http://localhost:3000/';

  getLotteryTickets() {
    return this.http.get<Lottoschein[]>(this.baseUrl + 'lottery-tickets');
  }

  save(lottoschein: Lottoschein): Observable<Lottoschein> {
    return this.http.post<Lottoschein>(this.baseUrl + 'lottery-tickets', lottoschein);
  }

  getDistribution() {
    return this.http.get<Distribution>(this.baseUrl + 'distribution/1');
  }

  saveDistribution(distribution: Distribution): Observable<Distribution> {
    return this.http.put<Distribution>(this.baseUrl + 'distribution/1', distribution);
  }
}
