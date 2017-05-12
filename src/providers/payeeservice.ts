import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, RequestMethod} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Payeeservice provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Payeeservice {

  constructor(public http: Http) {
    console.log('Hello Payeeservice Provider');
  }

    apiCustomers : string = '/api/customer';

   apiPayee: string = '/api/customer/payees';

   apiPayeeUpdate: string = '/api/customer/payee';

 // apiPayee: string = 'https://nmeservice.herokuapp.com/api/customer/1/payees';

  //apiPayeeUpdate: string = 'https://nmeservice.herokuapp.com/api/customer/payee';

  getPayees() {
    let headers = new Headers();
    headers.append('Authorization', localStorage.getItem('bearercode'));
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({
      method: RequestMethod.Get,
      headers: headers
    });

    return this.http.get(this.apiPayee+"/1", options).map(res=>res.json())
  }

  InsertPayee(firstname: string, lastname: string, middlename: string, accounttype: any, bankdetails: string, customerid: string) {
    let payee = <any>{};
    payee.firstName= firstname;
    payee.lastName=lastname;
    payee.middleName=middlename;
    payee.accountType=accounttype;
    payee.bankDetails=bankdetails;
    payee.customerId=customerid;

    let headers = new Headers();
    headers.append('Authorization', localStorage.getItem('bearercode'));
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({
      method: RequestMethod.Post,
      headers: headers
    });

    return this.http.post(this.apiPayeeUpdate, payee, options).map(res=>res.json());
  }

  UpdatePayee(firstname: string, lastname: string, middlename: string, accounttype: any, bankdetails: string, customerid: string, payeeid: string) {
    let payee = <any>{};
    payee.firstName= firstname;
    payee.lastName=lastname;
    payee.middleName=middlename;
    payee.accountType=accounttype;
    payee.bankDetails=bankdetails;
    payee.customerId=customerid;
    payee.payeeId=payeeid;

    let headers = new Headers();
    headers.append('Authorization', localStorage.getItem('bearercode'));
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({
      method: RequestMethod.Put,
      headers: headers
    });

    return this.http.put(this.apiPayeeUpdate, payee, options).map(res=>res.json());
  }

  DeletePayee(payeeId: any, customerId: any) {
    let payee = <any>{};
    payee.customerId=customerId;
    payee.payeeId=payeeId;
    payee.firstName="";
    payee.middleName="";
    payee.lastName="";
    payee.accountType="";
    payee.bankDetails="";
    console.log(payee);

    let headers = new Headers();
    headers.append('Authorization', localStorage.getItem('bearercode'));
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({
      method: RequestMethod.Delete,
      headers: headers,
      body: payee
    });

    return this.http.delete(this.apiPayeeUpdate, options).map(res=>res.json());
  }
}
