import { Component } from '@angular/core';
import {NavController, NavParams, LoadingController} from 'ionic-angular';
import {Payee} from "../payee/payee";
import {Payeeservice} from "../../providers/payeeservice";
import {Updatepayee} from "../updatepayee/updatepayee";

@Component({
  selector: 'page-payees',
  templateUrl: 'payees.html',
})
export class Payees {

  payees: {title: string}[] = [];
  loader: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public payeeservice: Payeeservice, public loadingCtrl: LoadingController) {
  }

  ionViewWillEnter() {
    this.load();
  }

  load() {
    this.presentLoading();
    this.payeeservice.getPayees().subscribe(
      data => {
        this.payees = data;
        this.loader.dismiss();
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

  updatePayee(payee) {
    console.log(payee);
    this.navCtrl.push(Updatepayee,{payee:payee});
  }

  deletePayee(payee) {
    this.payeeservice.DeletePayee(payee.payeeId, payee.customerId).subscribe(
      data => {
        this.loader.dismiss();
      },
      err => {
        console.log(err);
      },
      () => console.log('payee record deleted')
    );
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    this.loader.present();
  }

}
