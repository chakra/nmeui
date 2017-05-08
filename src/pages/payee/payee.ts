import { Component } from '@angular/core';
import {  NavController, NavParams, LoadingController } from 'ionic-angular';
import {Payeeservice} from "../../providers/payeeservice";
//import {HomePage} from "../home/home";
//import {Payees} from "../payees/payees";

@Component({
  selector: 'page-payee',
  templateUrl: 'payee.html',
})
export class Payee {

  results: Array<any>;
  loader: any;

  firstName: string = "";
  middleName: string = "";
  lastName: string = "";
  bankDetails: string = "";
  accountType: string="";

  Bank = {
    Name: 'key2'

  };
  Names = [
    {'Key': "-- select --"},
    {'Key1': "Kathmandu"},
    {'Key2': "Kathmandu"},
    {'Key3': "Kathmandu"},
    {'Key4': "Kathmandu"},
    {'Key5': "Kathmandu"}
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public payeeservice: Payeeservice, public loadingCtrl: LoadingController) {

  }

  onAddPayee(value: {title: string}) {
    this.navCtrl.pop();
  }

  public Insert()
  {
    this.presentLoading(); // pick customerId from localstorage
    this.payeeservice.InsertPayee(this.firstName, this.lastName, this.middleName, this.accountType,
      this.bankDetails,"1").subscribe(
      data => {
        this.results = data;
      },
      err => {
        console.log(err);
        this.loader.dismiss();
      },
      () => {
            console.log('add payee completed');
            this.loader.dismiss();
            this.navCtrl.pop();
         }
    );
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    this.loader.present();
  }

}
