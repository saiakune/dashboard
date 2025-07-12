import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

interface WinnabilityPosition {
  yourScore: number;
  marketAvg: number;
  topCompetitor: number;
}

interface WinnabilityFactor {
  name: string;
  impact: number;
}

interface Recommendation {
  title: string;
  description: string;
  type: string;
}

interface DecisionItem {
  label: string;
  isActive: boolean;
  badgeCount: number;
}

interface WinnabilityData {
  overallScore: number;
  confidence: string;
  position: WinnabilityPosition;
  decisionItems: DecisionItem[];
  riskAssessmentBadgeCount: number;
  documentsComplianceBadgeCount: number;
  increasingFactors: WinnabilityFactor[];
  decreasingFactors: WinnabilityFactor[];
  recommendations: Recommendation[];
}

interface StarRating {
  filled: boolean;
}

@Pipe({
  name: 'activeItemBadge',
  standalone: true
})

export class ActiveItemBadgePipe implements PipeTransform {
  transform(items: DecisionItem[]): number {
    return items.find(item => item.isActive)?.badgeCount || 0;
  }
}

@Component({
  selector: 'app-winnability',
  standalone: true,
  imports: [CommonModule, ActiveItemBadgePipe],
  templateUrl: './winnability.component.html',
  styleUrl: './winnability.component.scss'
})
export class WinnabilityComponent implements OnInit {
  winnabilityData: WinnabilityData = {
    overallScore: 0,
    confidence: '',
    position: { yourScore: 0, marketAvg: 0, topCompetitor: 0 },
    decisionItems: [],
    riskAssessmentBadgeCount: 0,
    documentsComplianceBadgeCount: 0,
    increasingFactors: [],
    decreasingFactors: [],
    recommendations: []
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchWinnabilityData().subscribe({
      next: (data) => {
        this.winnabilityData = data.winnability;
      },
      error: (error) => {
        console.error('Error fetching winnability data:', error);
      }
    });
  }

  fetchWinnabilityData(): Observable<{ winnability: WinnabilityData }> {
    return this.http.get<{ winnability: WinnabilityData }>('/assets/mock/account-details.json');
  }

  getStars(rating: number): StarRating[] {
    const stars: StarRating[] = [];
    for (let i = 1; i <= 4; i++) {
      stars.push({ filled: i <= Math.floor(rating) });
    }
    return stars;
  }

  applyRecommendation(recommendation: Recommendation): void {
    console.log('Apply recommendation:', recommendation);
  }

  setActiveDecision(index: number): void {
    this.winnabilityData.decisionItems = this.winnabilityData.decisionItems.map((item, i) => ({
      ...item,
      isActive: i === index
    }));
  }

  get decisionItems(): DecisionItem[] {
    return this.winnabilityData.decisionItems;
  }
}