import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import {Register} from "../pages/register/register";

import { HomePage } from '../pages/home/home';
import {Login} from "../pages/login/login";

//import {Payees} from "../pages/payees/payees";

//import {Transactions} from "../pages/transactions/transactions"
import {Personaldetails} from "../pages/personaldetails/personaldetails";
import {Payees} from "../pages/payees/payees";
import {Payee} from "../pages/payee/payee";
import {Transferpage} from "../pages/transferpage/transferpage";
import {Transaction} from "../providers/transaction";
import {Transactions} from "../pages/transactions/transactions";
//import {Tabs} from "../pages/tabs/tabs";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage:any = Login;

  pages: Array<{title: string, component: any}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Homepage', component: HomePage },
      /*{ title: 'Settings', component: Personaldetails },*/
      { title: 'Account', component: Personaldetails },
      { title: 'Payees', component: Payees },
      { title: 'Payee', component: Payee },
      { title: 'Transfer', component: Transferpage },
      { title: 'Transaction', component: Transaction },
      { title: 'Transactions', component: Transactions }
    ];

  }


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}

