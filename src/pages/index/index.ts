import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { BuscarPage } from '../buscar/buscar';
import { App, MenuController } from 'ionic-angular';
/**
 * Generated class for the IndexPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})
export class IndexPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, app: App, public menuCtrl: MenuController) {
    this.menuCtrl.enable(true);
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
}
