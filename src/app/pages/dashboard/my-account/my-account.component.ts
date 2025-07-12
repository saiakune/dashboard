import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Account {
  title: string;
  id: string;
  companyName: string;
  type: string;
  line: string;
  broker: string;
  renewalDate: string;
  premium: string;
  ratedPremium: string;
  lossRatio: string;
  appetite: string;
  status: string;
  triage: number;
  winnability: string;
}

interface MyAccountsData {
  myAccounts: {
    title: string;
    filters: string[];
    tableHeaders: string[];
    accounts: Account[];
  };
}

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.scss',
})
export class MyAccountComponent implements OnInit {
  title = '';
  filters: string[] = [];
  tableHeaders: string[] = [];
  accounts: Account[] = [];
  searchQuery: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<MyAccountsData>('/assets/mock/dashboard.json').subscribe({
      next: (data) => {
        this.title = data.myAccounts.title;
        this.filters = data.myAccounts.filters;
        this.tableHeaders = data.myAccounts.tableHeaders;
        this.accounts = data.myAccounts.accounts;
      },
      error: (err) => {
        console.error('HTTP error:', err);
      },
    });
  }

  getLossRatioStyles(ratio: string): { background: string; color: string } {
    const value = parseInt(ratio.replace('%', ''), 10);

    if (value < 35) {
      return {
        background: '#3bb979',
        color: '#ffffff',
      };
    }
    if (value < 60) {
      return {
        background: '#FDD261',
        color: '#041B2E',
      };
    }
    return {
      background: '#cc0101',
      color: '#ffffff',
    };
  }

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'active':
        return '#22c55e';
      case 'under review':
        return '#3b82f6';
      default:
        return '#9ca3af';
    }
  }

  getWinnabilityDots(status: string): any[] {
    const normalized = status.trim().toLowerCase();

    switch (normalized) {
      case 'very strong':
        return Array(4).fill(null);
      case 'strong':
        return Array(3).fill(null);
      case 'medium':
        return Array(2).fill(null);
      default:
        return Array(1).fill(null);
    }
  }

  filteredAccounts(): Account[] {
    if (!this.searchQuery.trim()) return this.accounts;

    const lower = this.searchQuery.toLowerCase();

    return this.accounts.filter(
      (a) =>
        a.companyName.toLowerCase().includes(lower) ||
        a.line.toLowerCase().includes(lower) ||
        a.broker.toLowerCase().includes(lower) ||
        a.status.toLowerCase().includes(lower)
    );
  }
}
