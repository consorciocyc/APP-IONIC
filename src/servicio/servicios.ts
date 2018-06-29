import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";


@Injectable()
export class UserService {



  constructor(private http: Http) {}


  public login(data) {

    return this.http.post('api/user/session_movil', data).map(res => res.json());
  }
  public searchprogramming(data) {

    return this.http.post('api/movil/search_programming', data).map(res => res.json());
  }

}
