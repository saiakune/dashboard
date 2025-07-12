import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface WinnabilityMetric {
  status: string;
  rating: number;
}

interface LossRatioMetric {
  current: number;
  target: number;
  status: string;
}

interface PremiumGrowthMetric {
  current: number;
  target: number;
}

interface ExposureDistribution {
  marineCargo: number;
  generalLiability: number;
  workersComp: number;
  other: number;
}

interface PerformanceMetrics {
  winnability: WinnabilityMetric;
  lossRatio: LossRatioMetric;
  premiumGrowth: PremiumGrowthMetric;
  exposureDistribution: ExposureDistribution;
}

@Component({
  selector: 'app-perfomance-metrics',
  imports: [CommonModule],
  templateUrl: './perfomance-metrics.component.html',
  styleUrl: './perfomance-metrics.component.scss',
})
export class PerfomanceMetricsComponent implements OnInit {
  metrics!: PerformanceMetrics;
  exposureItems: { label: string; value: number; class: string }[] = [];

  exposureMap: Record<
    keyof ExposureDistribution,
    { label: string; class: string }
  > = {
    marineCargo: { label: 'Marine Cargo', class: 'marine' },
    generalLiability: { label: 'General Liability', class: 'general' },
    workersComp: { label: 'Workers Comp', class: 'workers' },
    other: { label: 'Other', class: 'other' },
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<{ performanceMetrics: PerformanceMetrics }>(
        '/assets/mock/account-details.json'
      )
      .subscribe({
        next: (data) => {
          this.metrics = data.performanceMetrics;
          this.setExposureItems();
        },
        error: (err) => {
          console.error('Ошибка загрузки метрик:', err);
        },
      });
  }

  setExposureItems(): void {
    const d = this.metrics.exposureDistribution;
    this.exposureItems = Object.entries(d)
      .filter(([_, value]) => value > 0)
      .map(([key, value]) => ({
        label: this.exposureMap[key as keyof ExposureDistribution].label,
        class: this.exposureMap[key as keyof ExposureDistribution].class,
        value,
      }));
  }

  getDots(count: number): number[] {
    return Array.from({ length: count }, (_, i) => i);
  }
}
