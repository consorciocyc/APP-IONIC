import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from "@angular/http";
import {UploadyomPage} from "../uploadyom/uploadyom";
/**
 * Generated class for the SearchOymPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-oym',
  templateUrl: 'search-oym.html',
})
export class SearchOymPage {
  public consec;
  public items;

  constructor(public navCtrl: NavController, public navParams: NavParams,    public http: Http) {
  }

  ionViewDidLoad() {
   
  }


  launchSearch() {
    var link = "http://190.0.33.166:85/sip/public/api/movil/search_consec_oym";

    var myData = { consec: this.consec };

    this.http
      .post(link, myData)
      .map(res => res.json())
      .subscribe(
        result => {
          this.items = result.response;
        },
        error => {
          console.log(error);
        }
      );
  }
  itemSelected(consec) {
    this.navCtrl.push(UploadyomPage, {
      consec: consec
    });
  }
}
