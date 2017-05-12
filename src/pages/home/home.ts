import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Transferpage} from "../transferpage/transferpage";
import {Login} from "../login/login";
import {Register} from "../register/register";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  slides = [
    {
      title: "Welcome to Money Express",
      description: "The <b>best choice </b>for sending money ",
      image: "assets/img/slide1.png",
    },
    {
      title: "Welcome to Money Express",
      description: "Highest exchange rates available in market ",
      image: "assets/img/slide2.png",
    },
    {
      title: "Welcome to Money Express",
      description: "Share the happiness ",
      image: "assets/img/slide3.png",
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
