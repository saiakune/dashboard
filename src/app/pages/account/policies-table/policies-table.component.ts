import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoliciesService } from './policies-table.service';

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

@Component({
  selector: 'app-policies-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './policies-table.component.html',
  styleUrl: './policies-table.component.scss',
})
export class PoliciesTableComponent implements OnInit {
  policies: PolicyTableRow[] = [];
  totalPremium = '';
  totalExposure = '';
  totalChange = '';
  totalPerformance = '';
  totalRenewal = '';
  totalTech = '';
  totalPrem = '';
  totalLossRatio = '';

  constructor(private policiesService: PoliciesService) {}

  ngOnInit(): void {
    this.policiesService.getPolicies().subscribe((data) => {
      this.policies = data.policiesTable;
      this.calculateTotals();
    });
  }

  private parseCurrency(value: string): number {
    return parseFloat(value.replace(/[$,]/g, '')) || 0;
  }

  private calculateTotals(): void {
    let sumPremium = 0;
    let sumExposure = 0;
    let sumPerformance = 0;
    let countChange = 0;
    let sumChange = 0;
    let sumRenewal = 0;
    let sumTech = 0;
    let sumPrem = 0;

    let sumLossRatio = 0;
    let countLossRatio = 0;

    for (const policy of this.policies) {
      const premium = this.parseCurrency(policy.premium);
      const exposure = this.parseCurrency(policy.exposurePremium);
      const renewal = this.parseCurrency(policy.renewal);
      const tech = this.parseCurrency(policy.tech);
      const prem = this.parseCurrency(policy.prem);

      sumPremium += premium;
      sumExposure += exposure;
      sumRenewal += renewal;
      sumTech += tech;
      sumPrem += prem;

      let ratioValue: number | null = null;

      if (policy.lossRatio !== null && policy.lossRatio !== undefined) {
        if (typeof policy.lossRatio === 'string') {
          // Если lossRatio строка, например "55%"
          ratioValue = parseFloat(policy.lossRatio.replace('%', '').trim());
          if (isNaN(ratioValue)) ratioValue = null;
        } else if (typeof policy.lossRatio === 'number') {
          ratioValue = policy.lossRatio;
        }
      }

      if (ratioValue !== null) {
        sumLossRatio += ratioValue;
        countLossRatio += 1;
      }

      if (policy.percentChange !== null) {
        sumChange += policy.percentChange;
        countChange += 1;
      }
    }

    const avgChange = countChange > 0 ? sumChange / countChange : 0;
    const avgLossRatio =
      countLossRatio > 0 ? sumLossRatio / countLossRatio : null;

    this.totalPremium = `$${sumPremium.toLocaleString()}`;
    this.totalExposure = `$${sumExposure.toLocaleString()}`;
    this.totalChange = `${avgChange.toFixed(1)}%`;
    this.totalPerformance = `$${sumPerformance.toLocaleString()}`;
    this.totalRenewal = `$${sumRenewal.toLocaleString()}`;
    this.totalTech = `$${sumTech.toLocaleString()}`;
    this.totalPrem = `$${sumPrem.toLocaleString()}`;
    this.totalLossRatio =
      avgLossRatio !== null ? `${avgLossRatio.toFixed(1)}%` : 'N/A';
  }

  getLineClass(line: string): string {
    switch (line.toLowerCase()) {
      case 'marine cargo':
        return 'marine-cargo';
      case 'general liability':
        return 'general-liability';
      case 'workers comp':
        return 'workers-comp';
      case 'umbrella':
        return 'umbrella';
      default:
        return '';
    }
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'active':
        return 'active';
      case 'pending':
        return 'pending';
      default:
        return '';
    }
  }

  getChangeClass(change: number | null): string {
    if (change === null) return 'neutral';
    if (change > 0) return 'positive';
    if (change < 0) return 'negative';
    return 'neutral';
  }

  getLossRatioClass(value: string | number | null): string {
    if (value === null) return 'na';

    const num =
      typeof value === 'number'
        ? value
        : parseFloat(value.replace('%', '').trim());

    if (isNaN(num)) return 'na';

    if (num < 30) return 'low';
    if (num < 60) return 'medium';
    return 'high';
  }

  showPolicyDetails(policy: PolicyTableRow): void {
    console.log('Show policy details:', policy);
  }
}
