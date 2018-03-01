import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ViewFotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-foto',
  templateUrl: 'view-foto.html',
})
export class ViewFotoPage {

  public ruta ;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    let ruta = navParams.get('ruta');
    this.ruta=ruta;
  }



}
