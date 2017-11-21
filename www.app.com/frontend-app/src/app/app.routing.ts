import {HomePageComponent} from './component/home-page/home-page.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import {ResetPageComponent} from "./component/reset-page/reset-page.component";
import {ConfirmPageComponent} from "./component/confirm-page/confirm-page.component";
import {CalendarPageComponent} from "./component/calendar-page/calendar-page.component";
import {MessagePageComponent} from "./component/message-page/message-page.component";
import {DoctorsPageComponent} from "./component/doctors-page/doctors-page.component";
import {FaqPageComponent} from "./component/faq-page/faq-page.component";
import {ConfirmGuard} from "./guard/confirm.guard";

const appRoutes: Routes = [
  { path: 'faq', component: FaqPageComponent },
  { path: 'doctors', component: DoctorsPageComponent },
  { path: 'messages', component: MessagePageComponent, canActivate: [AuthGuard, ConfirmGuard] },
  { path: 'calendar', component: CalendarPageComponent, canActivate: [AuthGuard, ConfirmGuard] },
  { path: 'confirm', component: ConfirmPageComponent },
  { path: 'reset', component: ResetPageComponent },
  { path: '', component: HomePageComponent },

  { path: '**', redirectTo: '' }
];

export const RoutingModule = RouterModule.forRoot(appRoutes);
