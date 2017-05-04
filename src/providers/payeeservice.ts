import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
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

  api : string = '/api/transactions';

  getData() {
    return this.http.get(this.api).map(res=>res.json())
  }

  getPayees() {
    return this.http.get(this.api).map(res=>res.json())
  }
}
