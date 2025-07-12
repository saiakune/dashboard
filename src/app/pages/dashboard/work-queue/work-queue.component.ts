import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Column {
  key: string;
  label: string;
}

interface WorkQueueTab {
  id: string;
  label: string;
  count: number;
  active: boolean;
}

interface WorkQueueItem {
  id: string;
  assignee: string;
  company: string;
  type: string;
  status: 'New' | 'Pending Review' | 'Completed';
  created: string;
  avatar: string;
  tab: string;
}

@Component({
  standalone: true,
  selector: 'app-work-queue',
  imports: [CommonModule],
  templateUrl: './work-queue.component.html',
  styleUrl: './work-queue.component.scss',
})
export class WorkQueueComponent implements OnInit {
  private http = inject(HttpClient);

  tabs: WorkQueueTab[] = [];
  items: WorkQueueItem[] = [];
  columns: Column[] = [];
  activeTab: string = '';
  isLoading = true;

  ngOnInit(): void {
    this.http.get<any>('assets/mock/dashboard.json').subscribe({
      next: (data) => {
        const workQueue = data.workQueue || {};

        this.tabs = workQueue.tabs || [];
        this.items = workQueue.items || [];
        this.columns = workQueue.columns || [];

        const activeTab = this.tabs.find((tab) => tab.active);
        this.activeTab = activeTab ? activeTab.id : this.tabs[0]?.id || '';

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading data:', err);
        this.isLoading = false;
      },
    });
  }
  getStatusColor(status: string): string {
    switch (status) {
      case 'New':
        return '#3B82F6';
      case 'Pending Review':
        return '#FDD261';
      case 'Completed':
        return '#3BB979';
      default:
        return '#9ca3af';
    }
  }

  get filteredItems(): WorkQueueItem[] {
    if (!this.items || !this.activeTab) {
      return [];
    }
    if (this.activeTab === 'assigned') {
      return this.items;
    }
    return this.items.filter((item) => item.tab === this.activeTab);
  }

  get tabsWithCounts(): WorkQueueTab[] {
    return this.tabs.map((tab) => {
      const count =
        tab.id === 'assigned'
          ? this.items.length
          : this.items.filter((item) => item.tab === tab.id).length;
      return { ...tab, count };
    });
  }

  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
  }
}
