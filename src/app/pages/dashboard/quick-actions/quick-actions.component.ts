import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface QuickAction {
  id: string;
  title: string;
  label: string;
}
interface DashboardData {
  quickActions: {
    title: string;
    items: QuickAction[];
  };
}

@Component({
  selector: 'app-quick-actions',
  imports: [CommonModule],
  templateUrl: './quick-actions.component.html',
  styleUrl: './quick-actions.component.scss',
})
export class QuickActionsComponent {
  title = '';
  actions: QuickAction[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<DashboardData>('assets/mock/dashboard.json')
      .subscribe((data) => {
        this.title = data.quickActions.title;
        this.actions = data.quickActions.items;
      });
  }
}
