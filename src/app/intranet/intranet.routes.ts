import { Routes } from "@angular/router";
import LayoutComponent from "./layout/layout.component";
import { HistoryComponent } from "./pages/history/history.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { ReserveComponent } from "./pages/reserve/reserve.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";

export const intranetRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        title: 'HomePage',
        component: HomePageComponent
      },
      {
        path: 'reserve',
        title: 'Reservation',
        component: ReserveComponent
      },
      {
        path: 'history',
        title: 'History',
        component: HistoryComponent
      },
      {
        path: 'profile',
        title: 'Profile',
        component: ProfileComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
]

export default intranetRoutes
