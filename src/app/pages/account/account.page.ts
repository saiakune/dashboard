import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfomanceMetricsComponent } from './perfomance-metrics/perfomance-metrics.component';
import { PoliciesComponent } from './policies/policies.component';
import { StatusComplianceComponent } from './status-compliance/status-compliance.component';
import { WinnabilityComponent } from './winnability/winnability.component';
import { CommunicationComponent } from './communication/communication.component';
import { PoliciesTableComponent } from './policies-table/policies-table.component';
import { HttpClient } from '@angular/common/http';

interface AccountInfo {
  companyName: string;
  address: string;
  city: string;
  accountNumber: string;
  revenue: string;
  underwriters: string;
}
interface AttentionSection {
  title: string;
  subtitle: string;
  linkText: string;
  linkUrl: string;
}

interface AttentionCard {
  title: string;
  color: string;
  sections: AttentionSection[];
}

@Component({
  selector: 'app-account-page',
  imports: [
    CommonModule,

    PerfomanceMetricsComponent,
    PoliciesComponent,
    StatusComplianceComponent,
    WinnabilityComponent,
    CommunicationComponent,
    PoliciesTableComponent,
  ],
  templateUrl: './account.page.html',
  styleUrl: './account.page.scss',
})
export class AccountPage implements OnInit {
  accountInfo: AccountInfo | undefined;
  attentionCard?: AttentionCard;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('/assets/mock/account-details.json').subscribe({
      next: (data) => {
        this.accountInfo = data.accountInfo;
        this.attentionCard = data.attentionCard;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
