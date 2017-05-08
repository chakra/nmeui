import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Transaction} from "../../providers/transaction";

/**
 * Generated class for the Transactions page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html',
})
export class Transactions {

  transactions: {title: string}[] = [];
  _embedded;

  constructor(public navCtrl: NavController, public navParams: NavParams, public transaction: Transaction) {

    this.transaction.getTransactions()
      .subscribe(val => this.transactions = val._embedded['transactions']);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Transactions');
  }

}
