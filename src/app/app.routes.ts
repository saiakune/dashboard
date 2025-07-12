import { Routes } from "@angular/router";
import { DashboardPage } from "./pages/dashboard/dashboard.page";
import { AccountPage } from "./pages/account/account.page";
import { LayoutComponent } from "./layout/layout.component";


export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardPage,
      },
      {
        path: 'account',
        component: AccountPage,
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'dashboard',
      }
    ],
  }
];
