import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Http } from "@angular/http";
import { UploadImagePage } from "../upload-image/upload-image";

/**
 * Generated class for the BuscarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-buscar",
  templateUrl: "buscar.html"
})
export class BuscarPage {
  public consec;
  public items;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http
  ) {}

  launchSearch() {
    var link = "http://190.0.33.166:85/sip/public/api/movil/search_consec";

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
    this.navCtrl.push(UploadImagePage, {
      consec: consec
    });
  }
}
