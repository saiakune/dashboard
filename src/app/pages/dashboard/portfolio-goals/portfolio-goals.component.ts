import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Goal {
  title: string;
  target: string;
  value: string;
  percentage: number;
  diff: string;
  status: string;
}

interface PortfolioGoals {
  portfolioGoals: {
    tabs: Goal[];
  };
}

@Component({
  selector: 'app-portfolio-goals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio-goals.component.html',
  styleUrl: './portfolio-goals.component.scss',
})
export class PortfolioGoalsComponent implements OnInit {
  goals: Goal[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<PortfolioGoals>('/assets/mock/dashboard.json')
      .subscribe((data) => {
        this.goals = data.portfolioGoals.tabs;
      });
  }

  getGreenWidth(goal: Goal): number {
    if (goal.title === 'PORTFOLIO LOSS RATIO TARGET') {
      return 55;
    }
    if (goal.title === 'RENEWAL RETENTION') {
      return 10;
    }
    return 0;
  }

  getYellowWidth(goal: Goal): number {
    if (goal.title === 'PORTFOLIO LOSS RATIO TARGET') {
      return 10;
    }
    if (goal.title === 'RENEWAL RETENTION') {
      return 5;
    }
    return 0;
  }

  getRedWidth(goal: Goal): number {
    return 100 - this.getGreenWidth(goal) - this.getYellowWidth(goal);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'GOOD':
        return 'good';
      case 'ON TARGET':
        return 'on-target';
      default:
        return '';
    }
  }
}
