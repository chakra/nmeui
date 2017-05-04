import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Payee} from "../payee/payee";
import {Payeeservice} from "../../providers/payeeservice";
//import {PayeeService} from "../services/payee.service";

//import {Payeeservice} from "../providers/p"

@Component({
  selector: 'page-payees',
  templateUrl: 'payees.html',
})
export class Payees {

  payees: {title: string}[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public payeeservice: Payeeservice) {

   // this.myService.getConfig().subscribe(val => console.log(val));

    this.payeeservice.getPayees().subscribe(val => console.log(val));

    //console.log(this.payeeservice.getPayees());
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Payees');
  }

  addPayee() {
    this.navCtrl.push(Payee);
  }

  ionViewWillEnter() {
    console.log(this.payeeservice.getPayees());
  }


}
