import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import {RoutingModule} from './app.routing';
import {AuthGuard} from './guard/auth.guard';
import {LoginService} from './service/login.service';
import {HttpClient} from './http/http.client';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import { ResetPageComponent } from './component/reset-page/reset-page.component';
import {ResetService} from "./service/reset.service";
import { MessagesComponent } from './component/messages/messages.component';
import {MessageService} from "./service/message.service";
import {UsernameValidator} from "./validator/username-validator";
import {RequestFactory} from "./factory/request-factory";
import {EmailValidator} from "./validator/email-validator";
import {PasswordValidator} from "./validator/password-validator";
import { InputInfoComponent } from './component/input-info/input-info.component';
import { WelcomeContentComponent } from './component/welcome-content/welcome-content.component';
import { LoginNavbarComponent } from './component/login-navbar/login-navbar.component';
import {LoginStatus} from "./status/login-status";
import {CredentialValidator} from "./validator/credential-validator";
import { NavbarLogoComponent } from './component/navbar-logo/navbar-logo.component';
import { ResetPopupComponent } from './component/reset-popup/reset-popup.component';
import {ResetStartStatus} from "./status/reset-start-status";
import { MenuNavbarComponent } from './component/menu-navbar/menu-navbar.component';
import { ResetNavbarComponent } from './component/reset-navbar/reset-navbar.component';
import {ResetStatus} from "./status/reset-status";
import {ResetCodeValidator} from "./validator/reset-code-validator";
import {DtoFactory} from "./factory/dto-factory";
import {ParamFactory} from "./factory/param-factory";
import {AuthStatus} from "./status/auth-status";
import { DashboardComponent } from './component/dashboard/dashboard.component';
import {DashboardElementComponent} from "./component/dashboard-element/dashboard-element.component";
import { CalendarPageComponent } from './component/calendar-page/calendar-page.component';
import { MessagesPageComponent } from './component/messages-page/messages-page.component';
import { EditPageComponent } from './component/edit-page/edit-page.component';
import { SecurityPageComponent } from './component/security-page/security-page.component';
import {MainMessageValidator} from "./validator/main-message-validator";
import {InfoStatus} from "./status/info-status";
import {MainMessageService} from "./service/main-message.service";
import {CreatorFactory} from "./factory/creator-factory";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CalendarStatus} from "./status/calendar-status";
import {CalendarService} from "./service/calendar.service";
import {MessageStatus} from "./status/message-status";
import {PrivateMessageService} from "./service/private-message.service";
import { FaqPageComponent } from './component/faq-page/faq-page.component';
import {FaqStatus} from "./status/faq-status";
import {FaqService} from "./service/faq.service";
import {DatePrinter} from "./service/date-printer.service";


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ResetPageComponent,
    MessagesComponent,
    InputInfoComponent,
    WelcomeContentComponent,
    LoginNavbarComponent,
    NavbarLogoComponent,
    ResetPopupComponent,
    MenuNavbarComponent,
    ResetNavbarComponent,
    DashboardComponent,
    DashboardElementComponent,
    CalendarPageComponent,
    MessagesPageComponent,
    EditPageComponent,
    SecurityPageComponent,
    FaqPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RoutingModule,
    HttpModule,
    FormsModule,
  ],
  providers: [
    AuthGuard,
    HttpClient,
    LoginService,
    ResetService,
    MessageService,
    FaqService,
    MainMessageService,
    PrivateMessageService,
    CalendarService,
    DatePrinter,
    UsernameValidator,
    EmailValidator,
    CredentialValidator,
    PasswordValidator,
    ResetCodeValidator,
    MainMessageValidator,
    RequestFactory,
    ParamFactory,
    DtoFactory,
    CreatorFactory,
    AuthStatus,
    FaqStatus,
    MessageStatus,
    LoginStatus,
    ResetStatus,
    ResetStartStatus,
    CalendarStatus,
    InfoStatus
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
