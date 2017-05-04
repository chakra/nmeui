import { Component } from '@angular/core';
import {NavController, Loading, AlertController, LoadingController} from "ionic-angular";
import {Authservice} from "../../providers/authservice";
import {Http, Headers, HTTP_BINDINGS} from 'angular2/http';
import 'rxjs/Rx';
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

  constructor(private nav: NavController, private auth: Authservice, private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }

  public createAccount() {
    this.nav.push('RegisterPage');
  }

  public getAuthToken() {
    this.auth_type = 'Bearer';

    var $obs = this.auth.getAuthTokenSimple(this.registerCredentials);

    $obs.subscribe(
      data => {
        this.auth_status = 'OK';
        this.is_auth_error = false;
      },
      err => {
        var errorMessage = this.extractErrorMessage(err);

        this.auth_status = 'Error : ${errorMessage}';
        this.is_auth_error = true;
        this.logError(err);
      },
      () => console.log('Finish Auth')
    );
  }

  public login() {
    this.showLoading()
    this.auth.getAuthTokenSimple(this.registerCredentials).subscribe(allowed => {
        if (allowed) {
          this.nav.setRoot('HomePage');
        } else {
          this.showError("Access Denied");
        }
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
