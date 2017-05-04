import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Payees } from '../pages/payees/payees';
import { Payee } from '../pages/payee/payee'
import {IonicStorageModule} from "@ionic/storage";

import {Login} from "../pages/login/login";
import {Register} from "../pages/register/register";
import {Payeeservice} from "../providers/payeeservice";

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {Authservice} from "../providers/authservice";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Payees,
    Payee,
    Login,
    Register
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Payees,
    Payee,
    Login,
    Register
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Payeeservice,
    Authservice
  ]
})
export class AppModule {}
