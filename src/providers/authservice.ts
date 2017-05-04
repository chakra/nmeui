import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
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

  quoteOfTheDay:string[] = [];
  api_url:string = "https://obscure-fjord-89635.herokuapp.com/api/oauth/token?username=henryy&password=henryy&grant_type=password";
  //api_url:string = "http://localhost:9191/api/oauth";

  app_name:string = "angular2";
  auth_status:string = "";
  is_auth_error:boolean = false;
  auth_token:{ header_name : string, header_value: string} = {header_name: '', header_value: ''};

  constructor(public http: Http) {
    console.log('Hello Authservice Provider');
  }


  currentUser: User;
  //authdata = { client_id: 'nmeuserclient', client_secret: 'secret' };

  get tokenUrl() {
   // return this.api_url + "/token?username=henryy&password=henryy&grant_type=password";

    return '/api';
  }

  public getAuthTokenSimple(credentials) {

    var authdata = window.btoa('nmeuserclient:secret');

    let header = new Headers()
    header.append('Content-Type', 'application/json; charset=utf-8');
    header.append('Authorization',  'Basic ' + authdata);
    //header.append('Accept', 'application/json; charset=utf-8');
    //header.append('Access-Control-Request-Headers', 'Authorization');
    //header.append('Access-Control-Request-Method', 'GET');

    var $obs = this.http.get("/api/oauth/token/", {headers : header})
      .map(res => this.getToken(res));

    $obs.subscribe(
      data => {
        this.setTokenHeader(data)
      },
      err => {
        console.log('failed login');
      },
      () => console.log('Finish Auth')
    );

    return $obs;
  }

  private extractErrorMessage(err) {
    return JSON.parse(err._body).error_description;
  }

  public useAnoymousAuth() {

    this.setAnonymousHeader();
  }

  private setTokenHeader(jwt) {
    if (jwt) {
      this.auth_token.header_name = "Authorization";
      this.auth_token.header_value = "Bearer " + jwt;
      //localStorage.setItem('jwt', jwt);
    }
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

  private get authHeader() {
    var authHeader = new Headers();
    authHeader.append(this.auth_token.header_name, this.auth_token.header_value);
    return authHeader;
  }

  public postItem(name) {
    let data = JSON.stringify({description: name});

    return this.http.post(this.api_url + '/1/objects/todo?returnObject=true', data,
      {
        headers: this.authHeader
      })
      .retry(3)
      .map(res => {
        console.log(res.json());
        return res.json();
      });

  }

  /*
   let header = new Headers();
   header.append('Content-Type', 'application/x-www-form-urlencoded');

   var $obs = this.http.post(this.tokenUrl, creds, {
   headers: header
   })
   .map(res => this.getToken(res));

   */


 /* public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {

      var _url = "https://obscure-fjord-89635.herokuapp.com/api/oauth/token?username=henryy&password=henryy&grant_type=password"
      var _authdata = 'nmeclient' + ':' + 'secret';

      var _headers = {
        'Authorization': 'Basic ' + _authdata,
        'Accept': 'application/json; charset=utf-8',
        'Content-Type': 'application/json; charset=utf-8'
      };

     return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
        let access = (credentials.password === "pass" && credentials.email === "email");
        this.currentUser = new User('Simon', 'saimon@devdactic.com');
        observer.next(access);
        observer.complete();
      });
    }
  }*/

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
