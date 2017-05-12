import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, RequestMethod} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Transaction {

  constructor(public http: Http) {
    console.log('Hello Transaction Provider');
  }

  api : string = '/api/transactions';

  //apiTransaction: string = '/api/transactions/{customerId}/list/{pageNumber';

  //api : string = 'https://nmeservice.herokuapp.com/api/transactions'

  getTransactions(customerId, pageNumber) {
    let headers = new Headers();
    headers.append('Authorization', localStorage.getItem('bearercode'));
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({
      method: RequestMethod.Get,
      headers: headers
    });

    return this.http.get(this.api + '/' + 1 + '/list/' + pageNumber , options).map(res=>res.json())
  }

}
