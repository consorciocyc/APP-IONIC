import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ViewFotoPage } from "../view-foto/view-foto";
import { Http } from "@angular/http";
/**
 * Generated class for the ViewoymPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-viewoym",
  templateUrl: "viewoym.html"
})
export class ViewoymPage {
  public items;
  public urlimage = "http://190.0.33.166:85/sip/public/public";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http
  ) {
    let data = navParams.get("data");
    this.Search_image(data);
  }

  ionViewDidLoad() {}

  Search_image(data) {
    console.log(data);
    var link = "http://190.0.33.166:85/sip/public/api/movil/search_image_oym";

    this.http
      .post(link, data)
      .map(res => res.json())
      .subscribe(
        result => {
          this.items = result.response;
          console.log(result);
        },
        error => {
          console.log(error);
        }
      );
  }

  ViewImagen(idimage_internas) {
    this.navCtrl.push(ViewFotoPage, {
      ruta: idimage_internas
    });
  }
}
