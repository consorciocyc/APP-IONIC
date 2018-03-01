import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { UploadImagePage } from '../upload-image/upload-image';


/**
 * Generated class for the ViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view',
  templateUrl: 'view.html',
})
export class ViewPage {

  public data;
  public items;
  public res;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.data = JSON.parse(localStorage.getItem('userData'));
    let month = navParams.get('month');
    let month2 = navParams.get('month2');
    let select = navParams.get('select');
    console.log(month, month2, select, this.data.cedula);

    if (month != "") {

      this.launchSearch(month, month2, select, this.data.cedula)

    }
  }

  launchSearch(month, month2, select, cedula) {


    var link = 'http://190.0.33.166/appmovil1/class/ConsultaProgramacion2.php';

    var myData = JSON.stringify({ 'cedula': cedula, 'estado': select, 'fecha': month, 'month2': month2 });

    this.http.post(link, myData).map(res => res.json()).subscribe(
      result => {

          this.items = result;

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
