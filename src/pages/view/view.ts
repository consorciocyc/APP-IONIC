import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { UploadImagePage } from "../upload-image/upload-image";
import { ToastController } from "ionic-angular";
import { LoadingController } from "ionic-angular";

/**
 * Generated class for the ViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-view",
  templateUrl: "view.html"
})
export class ViewPage {
  public cedula;
  public items;
  public res;
  public respuesta;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public loadingCtrl: LoadingController
  ) {
    this.cedula = JSON.parse(localStorage.getItem("cedula"));
    let month = navParams.get("month");
    let month2 = navParams.get("month2");

    if (month != "") {
      this.launchSearch(month, month2, this.cedula);
    }
  }

  launchSearch(month, month2, cedula) {
    let loader = this.loadingCtrl.create({
      content: "Por favor Espere...",
      duration: 2000
    });
    loader.present();

    var link =
      "http://190.0.33.166:85/sip/public/api/movil/search_programming2";

    var myData = {
      cedula: this.cedula,
      fecha: month,
      month2: month2
    };

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
