import { Component } from '@angular/core';
import {NavController, NavParams, LoadingController} from 'ionic-angular';
import {Payee} from "../payee/payee";
import {Payeeservice} from "../../providers/payeeservice";
import {Accountservice} from "../../providers/accountservice";
import {Modal} from "../modal/modal";
import {Transactions} from "../transactions/transactions";

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

  payeeSelected:string = "";
  payees: {title: string}[] = [];
  loader: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public payeeservice: Payeeservice,
              public accountservice: Accountservice, public loadingCtrl: LoadingController) {
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

  submit() {
    this.checkForAccountDetails();

  }

  private checkForAccountDetails() {
    let customerDetails:any;
    this.accountservice.fetchAccountDetails(1).subscribe(
      data => {
        customerDetails = data;

        let detailsincomplete:boolean = false
        if ((typeof customerDetails.nationality!='undefined' && customerDetails.nationality)
              && (typeof customerDetails.driverlicense!='undefined' && customerDetails.driverlicense)
              && (typeof customerDetails.driverlicense!='undefined' && customerDetails.driverlicense)
              && (typeof customerDetails.firstName!='undefined' && customerDetails.firstName)
              && (typeof customerDetails.middleName!='undefined' && customerDetails.middleName)
              && (typeof customerDetails.lastName!='undefined' && customerDetails.lastName)
              && (typeof customerDetails.passportnumber!='undefined' && customerDetails.passportnumber)
              && (typeof customerDetails.dob!='undefined' && customerDetails.dob)
              && (typeof customerDetails.address!='undefined' && customerDetails.address)
              && (typeof customerDetails.account!='undefined' && customerDetails.account)){
          detailsincomplete = true;
        }

        if (!detailsincomplete) {
          this.navCtrl.push(Modal);
        } else {
          this.navCtrl.push(Transactions);
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


