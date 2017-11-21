import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import {RoutingModule} from './app.routing';
import {AuthGuard} from './guard/auth.guard';
import {ConfirmGuard} from './guard/confirm.guard';
import {ConfirmComponent} from './component/confirm/confirm.component';
import {SignupService} from './service/signup.service';
import {LoginService} from './service/login.service';
import {HttpClient} from './http/http.client';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {ConfirmService} from './service/confirm.service';
import { ResetPageComponent } from './component/reset-page/reset-page.component';
import {ResetService} from "./service/reset.service";
import { MessagesComponent } from './component/messages/messages.component';
import {MessageService} from "./service/message.service";
import {UsernameValidator} from "./validator/username-validator";
import {RequestFactory} from "./factory/request-factory";
import {SignupStatus} from "./status/signup-status";
import {EmailValidator} from "./validator/email-validator";
import {PasswordValidator} from "./validator/password-validator";
import { SignupUsernameInputComponent } from './component/signup-username-input/signup-username-input.component';
import { InputInfoComponent } from './component/input-info/input-info.component';
import { SignupEmailInputComponent } from './component/signup-email-input/signup-email-input.component';
import {SignupPasswordInputComponent} from "./component/signup-password-input/signup-password-input.component";
import { SignupPasswordAgainInputComponent } from './component/signup-password-again-input/signup-password-again-input.component';
import { SignupButtonComponent } from './component/signup-button/signup-button.component';
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
import {ConfirmStatus} from "./status/confirm-status";
import {ConfirmCodeValidator} from "./validator/confirm-code-validator";
import {DtoFactory} from "./factory/dto-factory";
import {ParamFactory} from "./factory/param-factory";
import { SignupComponent } from './component/signup/signup.component';
import {AuthStatus} from "./status/auth-status";
import { ConfirmPageComponent } from './component/confirm-page/confirm-page.component';
import { ConfirmCodeInputComponent } from './component/confirm-code-input/confirm-code-input.component';
import {ConfirmNavbarComponent} from "./component/confirm-navbar/confirm-navbar.component";
import { DoctorsPageComponent } from './component/doctors-page/doctors-page.component';
import { FaqPageComponent } from './component/faq-page/faq-page.component';
import { CalendarPageComponent } from './component/calendar-page/calendar-page.component';
import { MessagePageComponent } from './component/message-page/message-page.component';
import { MainControllerComponent } from './component/main-controller/main-controller.component';
import {MessagesStatus} from "./status/messages-status";
import {PrivateMessageService} from "./service/private-message.service";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ConfirmComponent,
    ResetPageComponent,
    MessagesComponent,
    SignupUsernameInputComponent,
    InputInfoComponent,
    SignupEmailInputComponent,
    SignupPasswordInputComponent,
    SignupPasswordAgainInputComponent,
    SignupButtonComponent,
    WelcomeContentComponent,
    LoginNavbarComponent,
    NavbarLogoComponent,
    ResetPopupComponent,
    MenuNavbarComponent,
    ResetNavbarComponent,
    SignupComponent,
    ConfirmPageComponent,
    ConfirmNavbarComponent,
    ConfirmCodeInputComponent,
    DoctorsPageComponent,
    FaqPageComponent,
    CalendarPageComponent,
    MessagePageComponent,
    MainControllerComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [
    AuthGuard,
    ConfirmGuard,
    HttpClient,
    SignupService,
    LoginService,
    ResetService,
    MessageService,
    ConfirmService,
    PrivateMessageService,
    UsernameValidator,
    EmailValidator,
    CredentialValidator,
    PasswordValidator,
    ConfirmCodeValidator,
    ResetCodeValidator,
    RequestFactory,
    ParamFactory,
    DtoFactory,
    AuthStatus,
    ConfirmStatus,
    LoginStatus,
    ResetStatus,
    ResetStartStatus,
    MessagesStatus,
    SignupStatus
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
