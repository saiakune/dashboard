import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface NavItem {
  label: string;
  link: string;
  icon: string;
}

@Component({
  selector: 'app-navigation',
  imports: [CommonModule, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  navItems: NavItem[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<{ navigation: NavItem[] }>('assets/mock/header.json')
      .subscribe({
        next: (res) => {
          this.navItems = res.navigation;
        },
        error: (err) => {
          console.error('Failed to load navigation data', err);
        },
      });
  }
}
