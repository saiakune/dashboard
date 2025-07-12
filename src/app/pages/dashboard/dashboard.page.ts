import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";

import { WorkQueueComponent } from "./work-queue/work-queue.component";
import { PortfolioGoalsComponent } from "./portfolio-goals/portfolio-goals.component";
import { QuickActionsComponent } from "./quick-actions/quick-actions.component";
import { MarketIntelligenceComponent } from "./market-intelligence/market-intelligence.component";
import { MyAccountComponent } from "./my-account/my-account.component";

@Component({
  selector: "app-dashboard-page",
  imports: [
    CommonModule,

    WorkQueueComponent,
    PortfolioGoalsComponent,
    QuickActionsComponent,
    MarketIntelligenceComponent,
    MyAccountComponent,
  ],
  templateUrl: "./dashboard.page.html",
  styleUrl: "./dashboard.page.scss",
})
export class DashboardPage {}
