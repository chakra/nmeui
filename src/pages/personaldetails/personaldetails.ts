import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController} from 'ionic-angular';
import {Accountservice} from "../../providers/accountservice";

/**
 * Generated class for the Personaldetails page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-personaldetails',
  templateUrl: 'personaldetails.html',
})
export class Personaldetails {

  accountdetail;
  loader: any;

  customerId: string;
  firstName: string = "";
   middleName: string = "";
   lastName: string = "";
   dob: string = "";
  passportnumber: string = "";
  nationality: string = "";
  driverlicense: string = "";
  unit: string = "";
  street: string = "";
  postcode: string = "";
  state: string = "";
  country: string = "";
  bsbNumber: string = "";
  accountNumber: string = "";
  bank: string = "";
  addressId: string = "";
  accountId: string = "";
  payees: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public accountservice: Accountservice) {

  }

  onUpdateAccount(value: {title: string}) {
    this.navCtrl.pop();
  }

  ngOnInit()
  {
    this.presentLoading();
    this.accountservice.fetchAccountDetails(2).subscribe(
      data => {
        this.accountdetail = data;
        this.firstName = this.accountdetail.firstName;
        this.middleName = this.accountdetail.middleName;
        this.lastName = this.accountdetail.lastName;
        this.customerId = this.accountdetail.customerId;
        this.dob = this.accountdetail.dob;
        this.driverlicense = this.accountdetail.driverlicense;
        this.nationality = this.accountdetail.nationality;
        this.passportnumber = this.accountdetail.passportnumber;

        if(typeof this.accountdetail.address!='undefined' && this.accountdetail.address) {
          this.unit = this.accountdetail.address.unit;
          this.state = this.accountdetail.address.state;
          this.street = this.accountdetail.address.street;
          this.postcode = this.accountdetail.address.postcode;
          this.country = this.accountdetail.address.country;
          this.addressId = this.accountdetail.address.addressId;
        }

        if(typeof this.accountdetail.account!='undefined' && this.accountdetail.account) {
          this.bsbNumber = this.accountdetail.account.bsbNumber;
          this.accountNumber = this.accountdetail.account.accountNumber;
          this.bank = this.accountdetail.account.bank;
          this.accountId = this.accountdetail.account.accountId;
        }

        if(typeof this.accountdetail.payees!='undefined' && this.accountdetail.payees) {
          this.payees = this.accountdetail.payees;
        }

        this.loader.dismiss();
      },
      err => {
        console.log(err);
      },
      () => console.log('Load Account Complete')
    );
  }

  presentLoading() {
    /*this.loader = this.loadingCtrl.create({
      content: "Loading..."
    });

*/

    this.loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box"></div>
      </div>`
    });

    this.loader.present();
  }

  Update() {
    this.presentLoading();
    this.accountservice.updateAccountDetails(this.firstName, this.middleName, this.lastName,
            this.customerId, this.dob, this.driverlicense, this.nationality,
            this.passportnumber, this.unit, this.state, this.street,
            this.postcode, this.country, this.bsbNumber, this.accountNumber,
            this.bank, this.payees).subscribe(
      data => {
        this.accountdetail = data;
        this.firstName = this.accountdetail.firstName;
        this.middleName = this.accountdetail.middleName;
        this.lastName = this.accountdetail.lastName;
        this.customerId = this.accountdetail.customerId;
        this.dob = this.accountdetail.dob;
        this.driverlicense = this.accountdetail.driverlicense;
        this.nationality = this.accountdetail.nationality;
        this.passportnumber = this.accountdetail.passportnumber;

        if(typeof this.accountdetail.address!='undefined' && this.accountdetail.address) {
          this.unit = this.accountdetail.address.unit;
          this.state = this.accountdetail.address.state;
          this.street = this.accountdetail.address.street;
          this.postcode = this.accountdetail.address.postcode;
          this.country = this.accountdetail.address.country;
          this.addressId = this.accountdetail.address.addressId;
        }

        if(typeof this.accountdetail.account!='undefined' && this.accountdetail.account) {
          this.bsbNumber = this.accountdetail.account.bsbNumber;
          this.accountNumber = this.accountdetail.account.accountNumber;
          this.bank = this.accountdetail.account.bank;
          this.accountId = this.accountdetail.account.accountId;
        }

        if(typeof this.accountdetail.payees!='undefined' && this.accountdetail.payees) {
          this.payees = this.accountdetail.payees;
        }

        this.loader.dismiss();
      },
      err => {
        console.log(err);
      },
      () => console.log('Update Account Complete')
    );
  }


}
