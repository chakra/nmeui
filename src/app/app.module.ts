import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Push } from '@ionic-native/push';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Payees } from '../pages/payees/payees';
import { Payee } from '../pages/payee/payee';
import {Transactions} from "../pages/transactions/transactions";
import {IonicStorageModule} from "@ionic/storage";

import {Login} from "../pages/login/login";
import {Register} from "../pages/register/register";
import {Payeeservice} from "../providers/payeeservice";

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {Authservice} from "../providers/authservice";
import {Transaction} from "../providers/transaction";
import {Updatepayee} from "../pages/updatepayee/updatepayee";
import {Accountservice} from "../providers/accountservice";
import {Personaldetails} from "../pages/personaldetails/personaldetails";
import {Tabs} from "../pages/tabs/tabs";
import {Transferpage} from "../pages/transferpage/transferpage";
import {Modal} from "../pages/modal/modal";
import {DetailsPage} from "../pages/details-page/details-page";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Payees,
    Payee,
    Login,
    Register,
    Transactions,
    Updatepayee,
    Personaldetails,
    Tabs,
    Transferpage,
    Modal,
    DetailsPage
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
    Register,
    Transactions,
    Updatepayee,
    Personaldetails,
    Tabs,
    Transferpage,
    Modal,
    DetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Push,
    Payeeservice,
    Authservice,
    Transaction,
    Accountservice
  ]
})
export class AppModule {}
