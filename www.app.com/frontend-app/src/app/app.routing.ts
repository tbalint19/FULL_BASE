import {HomePageComponent} from './component/home-page/home-page.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import {ResetPageComponent} from "./component/reset-page/reset-page.component";
import {ConfirmPageComponent} from "./component/confirm-page/confirm-page.component";

const appRoutes: Routes = [
  { path: 'confirm', component: ConfirmPageComponent },
  { path: 'reset', component: ResetPageComponent },
  { path: '', component: HomePageComponent },

  { path: '**', redirectTo: '' }
];

export const RoutingModule = RouterModule.forRoot(appRoutes);
