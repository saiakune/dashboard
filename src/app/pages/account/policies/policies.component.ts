import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Policy {
  id: string;
  type: string;
  premium: string;
  effective: string;
  status: string;
  statusColor: string;
  iconClass?: string;
  color?: string;
}

@Component({
  selector: 'app-policies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './policies.component.html',
  styleUrl: './policies.component.scss',
})
export class PoliciesComponent {
  policies: Policy[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<{ policies: Policy[] }>('assets/mock/account-details.json')
      .subscribe((data) => {
        this.policies = data.policies.map((policy) => ({
          ...policy,
          iconClass: this.getIconClass(policy.type),
          color: this.getIconColor(policy.type),
        }));
      });
  }

  getIconColor(type: string): string {
    const colors: Record<string, string> = {
      'marine cargo': '#3B82F6',
      'general liability': '#3BB979',
      'workers comp': '#6A3BF6',
      property: '#FDD261',
      umbrella: '#B93B3B',
    };
    return colors[type.toLowerCase()] ?? '#94a3b8';
  }

  getIconClass(type: string): string {
    const icons: Record<string, string> = {
      'marine cargo': 'fas fa-ship',
      'general liability': 'fas fa-shield',
      'workers comp': 'fas fa-user',
      property: 'fas fa-building',
      umbrella: 'fas fa-umbrella',
    };
    return icons[type.toLowerCase()] ?? 'fas fa-file';
  }
}
