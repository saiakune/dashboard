import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { HeaderComponent } from './header/header.component';

import { NavigationComponent } from './navigation/navigation.component';
import { LayoutDataService } from './layout-data.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  imports: [HeaderComponent, RouterOutlet, NavigationComponent],
})
export class LayoutComponent implements OnInit {
  headerData: any;
  navigationItems: any[] = [];

  constructor(private layoutDataService: LayoutDataService) {}

  ngOnInit(): void {
    this.layoutDataService.getLayoutData().subscribe((data) => {
      this.headerData = data.header;
      this.navigationItems = data.navigation;
    });
  }
  
}
