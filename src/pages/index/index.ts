import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { SearchPage } from "../search/search";
import { BuscarPage } from "../buscar/buscar";
import { App, MenuController } from "ionic-angular";
import { UserService } from "../../servicio/servicios";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { UploadImagePage } from "../upload-image/upload-image";

/**
 * Generated class for the IndexPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-index",
  templateUrl: "index.html",
  providers: [UserService]
})
export class IndexPage {
  public data;
  public items;
  public firstProjection;
  public cordenadas;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    app: App,
    public menuCtrl: MenuController,
    private userService: UserService
  ) {
    this.menuCtrl.enable(true);
    this.sear();
  }

  OnSearch() {
    this.navCtrl.push(SearchPage);
  }
  OnSearchB() {
    this.navCtrl.push(BuscarPage);
  }

  closeMenu() {
    this.menuCtrl.close();
  }
  OnSearchHome() {
    this.navCtrl.push(IndexPage);
  }

  sear() {
    this.data = localStorage.getItem("cedula");
    let params = { cedula: this.data };
    this.userService.searchprogramming(params).subscribe(
      result => {
        this.items = result.response;
      },
      error => {}
    );
  }

  itemSelected(consec) {
    console.log(consec);
    this.navCtrl.push(UploadImagePage, {
      consec: consec
    });
  }
}
