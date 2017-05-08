import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import {Payeeservice} from "../../providers/payeeservice";

/**
 * Generated class for the Updatepayee page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-updatepayee',
  templateUrl: 'updatepayee.html',
})
export class Updatepayee {

  payee;
  results: Array<any>;
  loader: any;

  customerId: string;
  payeeId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  bankDetails: string;
  accountType: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public payeeservice: Payeeservice, public loadingCtrl: LoadingController) {
    this.payee = navParams.data.payee;
    this.customerId = this.payee.customerId;
    this.payeeId = this.payee.payeeId;
    this.firstName = this.payee.firstName;
    this.middleName = this.payee.middleName;
    this.lastName = this.payee.lastName;
    this.bankDetails = this.payee.bankDetails;
    this.accountType = this.payee.accountType;
  }

  onUpdatePayee(value: {title: string}) {
    this.navCtrl.pop();
  }

  public Update()
  {
    this.presentLoading();
    this.payeeservice.UpdatePayee(this.firstName,this.lastName,this.middleName,this.accountType,this.bankDetails,
      this.customerId, this.payeeId).subscribe(
      data => {
        this.results = data;
        console.log(data);
        this.loader.dismiss();
        this.navCtrl.pop();
      },
      err => {
        console.log(err);
        this.loader.dismiss();
      },
      () =>  console.log('add payee completed') //this.loader.dismiss();
    );
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    this.loader.present();
  }
}
