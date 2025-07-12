import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface MarketItem {
  id: string;
  title: string;
  color: string;
  content: string;
}

interface MarketIntelligence {
  marketIntelligence: {
    title: string;
    items: MarketItem[];
  };
}

@Component({
  selector: 'app-market-intelligence',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './market-intelligence.component.html',
  styleUrl: './market-intelligence.component.scss',
})
export class MarketIntelligenceComponent implements OnInit {
  title = '';
  items: MarketItem[] = [];


  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<MarketIntelligence>('/assets/mock/dashboard.json')
      .subscribe((data) => {
        this.title = data.marketIntelligence.title;
        this.items = data.marketIntelligence.items;
      });
  }

  getDotColor(color: string): string {
    switch (color) {
      case 'red':
        return '#B93B3B';
      case 'yellow':
        return '#FDD261';
      case 'blue':
        return '#1E40AF';
      default:
        return '#ffffff';
    }
  }
}
