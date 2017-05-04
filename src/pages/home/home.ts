import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Payees} from "../payees/payees";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  showPayeeList() {
    this.navCtrl.push(Payees);
  }

}
