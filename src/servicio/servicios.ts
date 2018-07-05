import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";

@Injectable()
export class UserService {
  constructor(private http: Http) {}

  public login(data) {
    return this.http
      .post("http://190.0.33.166:85/sip/public/api/user/session_movil", data)
      .map(res => res.json());
  }
  public searchprogramming(data) {
    return this.http
      .post(
        "http://190.0.33.166:85/sip/public/api/movil/search_programming",
        data
      )
      .map(res => res.json());
  }
}
