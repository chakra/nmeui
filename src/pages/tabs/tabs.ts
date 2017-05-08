import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Payees} from "../payees/payees";
import {Transactions} from "../transactions/transactions";
import {Transferpage} from "../transferpage/transferpage";

/**
 * Generated class for the Tabs page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class Tabs {

  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = Payees;
  //tab2Root: any = AboutPage;
  tab2Root: any = Transactions;
  tab3Root: any = Transferpage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tabs');
  }

}
