import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";


export class User {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

@Injectable()
export class Authservice {

  //quoteOfTheDay:string[] = [];

 // apiToken:string = '/api/bearer';

  apiToken:string = 'https://nme-user-service.herokuapp.com/api/bearer';

  app_name:string = "angular2";
  auth_status:string = "";
  is_auth_error:boolean = false;
  auth_token:{ header_name : string, header_value: string} = {header_name: '', header_value: ''};

  constructor(public http: Http) {
    console.log('Hello Authservice Provider');
  }


  currentUser: User;

  get tokenUrl() {
    return '/api/bearer';
  }

  public getAuthTokenSimple(credentials) {

    let clientDetails = <any>{};
    clientDetails.clientId = "nmeuserclient";
    clientDetails.username = credentials.email;
    clientDetails.password = credentials.password;
    clientDetails.grantType = "password";
    clientDetails.secret = "secret";

    return this.http.post(this.apiToken, clientDetails )
      .map(res => this.getToken(res));

  }

  private extractErrorMessage(err) {
    return JSON.parse(err._body).error_description;
  }

  public useAnoymousAuth() {

    this.setAnonymousHeader();
  }

  public setAnonymousHeader() {
    this.auth_status = "OK";
    this.auth_token.header_name = "AnonymousToken";
    this.auth_token.header_value = "08fd510a-4b52-43fa-938f-f2c841bd3106";
  }

  private getToken(res) {
    console.log(res);
    return res.json().access_token;
  }


  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  public getUserInfo() : User {
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

}
