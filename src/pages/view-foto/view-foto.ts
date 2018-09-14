import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Http } from "@angular/http";
/**
 * Generated class for the ViewFotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-view-foto",
  templateUrl: "view-foto.html"
})
export class ViewFotoPage {
  public ruta;
  public ruta1;
  public type;
  public urlimage = "http://190.0.33.166:85/sip/public/public";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http
  ) {
    this.ruta = navParams.get("ruta");
    this.type = navParams.get("type");

    this.Search_image();
  }

  Search_image() {

    let data = { ruta: this.ruta,type: this.type};


    if(this.type==1){

      var link = "http://190.0.33.166:85/sip/public/api/movil/search_imageone";
      this.http
      .post(link, data)
      .map(res => res.json())
      .subscribe(
        result => {
          this.ruta1 =
            this.urlimage + result.response.url + result.response.name_image;
          console.log(this.ruta1);
        },
        error => {
          console.log(error);
        }
      );
    }
    if(this.type==3){
      var link = "http://190.0.33.166:85/sip/public/api/movil/search_imageone_oym";
      this.http
      .post(link, data)
      .map(res => res.json())
      .subscribe(
        result => {
          this.ruta1 =
            this.urlimage + result.response.url + result.response.name_image;
          console.log(this.ruta1);
        },
        error => {
          console.log(error);
        }
      );
    }
    

  }
}
