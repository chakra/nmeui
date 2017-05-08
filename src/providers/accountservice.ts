import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, RequestMethod} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Accountservice provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Accountservice {

  //apiCustomerGet : string = "/api/customer/id/1";

 // apiCustomerUpdate : string = "/api/customer";

  apiCustomerGet : string = "https://nmeservice.herokuapp.com/api/customer/id/1";

  apiCustomerUpdate : string = "https://nmeservice.herokuapp.com/api/customer";

  constructor(public http: Http) {
    console.log('Hello Accountservice Provider');
  }

  fetchAccountDetails(id) {
    let headers = new Headers();
    headers.append('Authorization', localStorage.getItem('bearercode'));
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({
      method: RequestMethod.Get,
      //url: this.apiCustomerGet,
      headers: headers
    });

    return this.http.get(this.apiCustomerGet, options).map(res=>res.json());
  }

  updateAccountDetails(firstName: string, middleName:string, lastName:string, customerId: string, dob: string, driverlicense: string, nationality: string,
  passportnumber: string, unit: string, state: string, street: string,postcode: string, country: string, bsbNumber:string, accountNumber: string,bank:string, payees: Array<any>) {
    let accountdetail = <any>{};
    let account = <any>{};
    let address = <any>{};
    accountdetail.firstName=firstName;
    accountdetail.middleName=middleName;
    accountdetail.lastName=lastName; 
    accountdetail.customerId=customerId;
    accountdetail.dob=dob;
    accountdetail.driverlicense=driverlicense;
    accountdetail.nationality=nationality; 
    accountdetail.passportnumber=passportnumber;
    address.unit=unit
    address.state=state;
    address.street=street;
    address.postcode=postcode;
    address.country=country;
    address.customerId=customerId;
    accountdetail.address=address;
    account.bsbNumber=bsbNumber;
    account.accountNumber=accountNumber;
    account.bank=bank;
    account.customerId=customerId;
    accountdetail.account=account;
    accountdetail.payees=payees;


    let headers = new Headers();
    headers.append('Authorization', localStorage.getItem('bearercode'));
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({
      method: RequestMethod.Post,
      //url: this.apiCustomerUpdate,
      headers: headers
    });

    return this.http.post(this.apiCustomerUpdate, accountdetail, options)
      .map(res => res.json());

  }

  private logError(err: any) {

  }

  private validateUser() {

  }
}
