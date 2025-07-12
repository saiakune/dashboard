import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface PolicyTableRow {
  line: string;
  inception: string;
  expiration: string;
  status: string;
  premium: string;
  exposurePremium: string;
  renewal: string;
  tech: string;
  prem: string;
  percentChange: number | null;
  lossRatio: string | number | null;
}

interface PoliciesResponse {
  policiesTable: PolicyTableRow[];
  totals: {
    totalPremium: string;
    totalChange: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class PoliciesService {
  private jsonUrl = 'assets/mock/account-details.json';

  constructor(private http: HttpClient) {}

  getPolicies(): Observable<PoliciesResponse> {
    return this.http.get<PoliciesResponse>(this.jsonUrl);
  }
}
