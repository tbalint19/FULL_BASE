import {HomePageComponent} from './component/home-page/home-page.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import {ResetPageComponent} from "./component/reset-page/reset-page.component";
import {CalendarPageComponent} from "./component/calendar-page/calendar-page.component";
import {MessagesPageComponent} from "./component/messages-page/messages-page.component";
import {EditPageComponent} from "./component/edit-page/edit-page.component";
import {SecurityPageComponent} from "./component/security-page/security-page.component";

const appRoutes: Routes = [
  { path: 'calendar', component: CalendarPageComponent, canActivate: [AuthGuard] },
  { path: 'messages', component: MessagesPageComponent, canActivate: [AuthGuard] },
  { path: 'edit', component: EditPageComponent, canActivate: [AuthGuard] },
  { path: 'security', component: SecurityPageComponent, canActivate: [AuthGuard] },
  { path: 'reset', component: ResetPageComponent },
  { path: '', component: HomePageComponent },

  { path: '**', redirectTo: '' }
];

export const RoutingModule = RouterModule.forRoot(appRoutes);
