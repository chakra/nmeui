import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {PayeeService} from "../services/payee.service";

@Component({
  selector: 'page-payee',
  templateUrl: 'payee.html',
})
export class Payee {

  constructor(public navCtrl: NavController, public navParams: NavParams, public payeeservice: PayeeService) {
  }

  onAddPayee(value: {title: string}) {
    this.payeeservice.addPayee(value);
    this.navCtrl.pop();
  }

}
