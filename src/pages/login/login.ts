import { Component } from '@angular/core';
import {NavController, Loading, AlertController, LoadingController} from "ionic-angular";
import {Authservice} from "../../providers/authservice";
import {Http} from 'angular2/http';
import 'rxjs/Rx';
import {HomePage} from "../home/home";
//import {errorHandler} from "@angular/platform-browser/src/browser";
//import {PayeeService} from "../services/payee.service";

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  loading: Loading;
  registerCredentials = { email: '', password: '' };

  auth_type:string = "N/A";
  is_auth_error:boolean = true;
  auth_status:string = "N/A";
  auth_token:{ header_name : string, header_value: string} = {header_name: '', header_value: ''};

  constructor(private nav: NavController, private auth: Authservice, private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }

  public createAccount() {
    this.nav.push('RegisterPage');
  }

  public login() {
    this.showLoading();
    console.log(this.auth.getAuthTokenSimple(this.registerCredentials));

    this.auth.getAuthTokenSimple(this.registerCredentials).subscribe(res => {
       //if (allowed) {
          console.log(res);
          this.setTokenHeader(res);
          this.nav.setRoot(HomePage);
        //} else {
        //  this.showError("Access Denied");
       // }
      },
      error => {
        this.showError(error);
      });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  setTokenHeader(token) {
    if (token) {
      this.auth_token.header_name = "Authorization";
      this.auth_token.header_value = "Bearer " + token;
      localStorage.setItem('bearercode', this.auth_token.header_value);
    }
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }


  logError(err) {
    console.error('Error: ' + err);
  }

  private extractErrorMessage(err) {
    return JSON.parse(err._body).error_description;
  }

}
