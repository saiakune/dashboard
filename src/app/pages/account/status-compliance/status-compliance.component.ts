import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface StatusStep {
  name: string;
  status: 'completed' | 'pending';
}

interface AccountStatusData {
  steps: StatusStep[];
}

interface ComplianceItem {
  name: string;
  status: 'completed' | 'pending';
}

interface StatusComplianceData {
  accountStatus: AccountStatusData;
  complianceItems: ComplianceItem[];
}

@Component({
  selector: 'app-status-compliance',
  imports: [CommonModule],
  templateUrl: './status-compliance.component.html',
  styleUrl: './status-compliance.component.scss',
})
export class StatusComplianceComponent {
  accountStatus: AccountStatusData = { steps: [] };
  complianceItems: ComplianceItem[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<StatusComplianceData>('/assets/mock/account-details.json')
      .subscribe((data) => {
        this.accountStatus = data.accountStatus;
        this.complianceItems = data.complianceItems;
      });
  }

  showHistory(): void {
    console.log('Show compliance history');
  }
}
