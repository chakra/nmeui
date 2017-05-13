import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Transferpage} from "../transferpage/transferpage";
import {Login} from "../login/login";
import {Register} from "../register/register";

@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class HomePage {

  slides = [
    {
      title: "Welcome to Money Express",
      description: "<b>Best choice </b>for sending money",
      image: "assets/img/money-transfer-logo.png",
    },
    {
      title: "Send Money",
      description: "<b>Best choice </b>for sending money",
      image: "assets/img/send-money.png",
    },
    {
      title: "Share the happiness",
      description: "Share <b>your satisfaction</b> with others",
      image: "assets/img/smiley.png",
    }
  ];

  constructor(public navCtrl: NavController) {
    console.log(localStorage.getItem("bearercode"));

  }

  showPayeeList() {
    this.navCtrl.push(Transferpage);
  }

  login() {
    this.navCtrl.setRoot(Login);
  }

  register() {
    this.navCtrl.setRoot(Register);
  }

}
