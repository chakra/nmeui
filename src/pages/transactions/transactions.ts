import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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

  transactions: any = [];

  private pageNumber: number = 1;

  searchTerm: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public transaction: Transaction) {
    this.initializeTransaction();
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    this.pageNumber = this.pageNumber + 1;

    setTimeout(() => {
      this.transaction.getTransactions(localStorage.getItem('customerId'), this.pageNumber )
        .subscribe(val =>
        {
          for(let transaction of val) {
            this.transactions.push(transaction);
          }
        }
      );

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

  filterItems(searchTerm){

    return this.transactions.filter((item) => {
      return item.fromAccount.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });

  }

  initializeTransaction() {
    this.pageNumber = 1; // reset to page 1
    this.transaction.getTransactions(localStorage.getItem('customerId'), this.pageNumber)
      .subscribe(
        val => {
          console.log(val);
          this.transactions = val;
        });
  }

  setFilteredItems() {
    if (this.searchTerm == '') {
      this.initializeTransaction();
    }
    this.transactions = this.filterItems(this.searchTerm);
  }

}
