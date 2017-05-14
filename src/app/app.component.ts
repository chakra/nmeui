import { Component, ViewChild } from '@angular/core';
import {Nav, AlertController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {Push, PushObject, PushOptions} from '@ionic-native/push';

import {Personaldetails} from "../pages/personaldetails/personaldetails";
import {Payees} from "../pages/payees/payees";
import {Payee} from "../pages/payee/payee";
import {Transferpage} from "../pages/transferpage/transferpage";
import {Transactions} from "../pages/transactions/transactions";
import {DetailsPage} from "../pages/details-page/details-page";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage:any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(private platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private push: Push, private alertCtrl: AlertController) {

    platform.ready().then(() => {
      statusBar.styleDefault();
     // this.initPushNotification();
      splashScreen.hide();
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Send Money', component: Transferpage },
      { title: 'Payees', component: Payees },
      { title: 'Transactions', component: Transactions },
      { title: 'Account Settings', component: Personaldetails },
      { title: 'Logout', component: Personaldetails },
    ];

  }


  initPushNotification() {
    if (!this.platform.is('cordova')) {
      console.warn("Push notifications not initialized. Cordova is not available - Run in physical device");
      return;
    }
    const options: PushOptions = {
      android: {
        senderID: "1025430360881"
      },
      ios: {
        alert: "true",
        badge: false,
        sound: "true"
      },
      windows: {}
    };

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('registration').subscribe((data: any) => {
      console.log("device token ->", data.registrationId);
      //TODO - send device token to server
    });

    pushObject.on('notification').subscribe((data: any) => {
      console.log('message', data.message);
      //if user using app and push notification comes
      if (data.additionalData.foreground) {
        // if application open, show popup
        let confirmAlert = this.alertCtrl.create({
          title: 'New Notification',
          message: data.message,
          buttons: [{
            text: 'Ignore',
            role: 'cancel'
          }, {
            text: 'View',
            handler: () => {
              //TODO: Your logic here
              this.nav.push(DetailsPage, {message: data.message});
            }
          }]
        });
        confirmAlert.present();
      } else {
        //if user NOT using app and push notification comes
        //TODO: Your logic on click of push notification directly
        this.nav.push(DetailsPage, {message: data.message});
        console.log("Push notification clicked");
      }
    });

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}

