import {HomePageComponent} from './component/home-page/home-page.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import {ResetPageComponent} from "./component/reset-page/reset-page.component";

const appRoutes: Routes = [
  { path: 'reset', component: ResetPageComponent },
  { path: '', component: HomePageComponent },

  { path: '**', redirectTo: '' }
];

export const RoutingModule = RouterModule.forRoot(appRoutes);
