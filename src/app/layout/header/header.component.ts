import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';

interface HeaderData {
  username: string;
  initials: string;
  openTasks: number;
  searchPlaceholder: string;
}
@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  data!: HeaderData;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<{ header: HeaderData }>('/assets/mock/header.json')
      .subscribe({
        next: (res) => {
          this.data = res.header;
          console.log('Header data loaded:', this.data);
        },
        error: (err) => {
          console.error('Failed to load header data', err);
        }
      });
  }
}
