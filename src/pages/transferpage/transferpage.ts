import { Component } from '@angular/core';
import {NavController, NavParams, LoadingController} from 'ionic-angular';
import {Payee} from "../payee/payee";
import {Payeeservice} from "../../providers/payeeservice";
import {Accountservice} from "../../providers/accountservice";
import {Modal} from "../modal/modal";
import {Transactions} from "../transactions/transactions";
import {Transaction} from "../../providers/transaction";

/**
 * Generated class for the Transferpage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-transferpage',
  templateUrl: 'transferpage.html',
})
export class Transferpage {

  payeeSelected:any = {};
  payees: any = [];
  loader: any;
  //payee: any = {};
  transaction: any = {};
  amount: string = "";
  customerDetails: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public payeeservice: Payeeservice,
              public accountservice: Accountservice, public loadingCtrl: LoadingController, public transactionservice : Transaction) {
  }

  ionViewWillEnter() {
    this.payeeservice.getPayees().subscribe(
      data => {
        this.payees = data;
        console.log(this.payees);
      },
      err => {
        console.log(err);
      },
      () => console.log('Load send money page ... ')
    );
  }

  addPayee() {
    this.navCtrl.push(Payee);
  }

  submit(payee, amount) {
    this.checkForAccountDetails();

    this.payees.forEach(payeee => {
      this.payeeSelected = payeee;
      var fullName = this.payeeSelected.firstName + " "+ this.payeeSelected.lastName;
      if (fullName === payee) {
        this.transaction.toAccount= this.payeeSelected.bankDetails;
        this.transaction.customerId = this.payeeSelected.customerId;
        this.transaction.amount = amount;
        this.transaction.fromAccount= "";
        this.transaction.rate = "84.5";
        this.transaction.transactionStatus= "Pending";
      }
    });

    this.transactionservice.addTransaction(this.transaction).subscribe(
      data => {
        console.log(data);
        this.navCtrl.push(Transactions);
      },
      err => {
        console.log(err);
      }
    );


  }

  private checkForAccountDetails() {
    this.accountservice.fetchAccountDetails(1).subscribe(
      data => {
        this.customerDetails = data;

        let detailsincomplete:boolean = false
        if ((typeof this.customerDetails.nationality!='undefined' && this.customerDetails.nationality)
              && (typeof this.customerDetails.driverlicense!='undefined' && this.customerDetails.driverlicense)
              && (typeof this.customerDetails.driverlicense!='undefined' && this.customerDetails.driverlicense)
              && (typeof this.customerDetails.firstName!='undefined' && this.customerDetails.firstName)
              && (typeof this.customerDetails.middleName!='undefined' && this.customerDetails.middleName)
              && (typeof this.customerDetails.lastName!='undefined' && this.customerDetails.lastName)
              && (typeof this.customerDetails.passportnumber!='undefined' && this.customerDetails.passportnumber)
              && (typeof this.customerDetails.dob!='undefined' && this.customerDetails.dob)
              && (typeof this.customerDetails.address!='undefined' && this.customerDetails.address)
              && (typeof this.customerDetails.account!='undefined' && this.customerDetails.account)){
          detailsincomplete = true;
        }

        if (!detailsincomplete) {
          this.navCtrl.push(Modal);
        }

      },
      err  => {
        console.log(err);
      },
      () => console.log('feching customer details')
    );
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    this.loader.present();
  }

}


