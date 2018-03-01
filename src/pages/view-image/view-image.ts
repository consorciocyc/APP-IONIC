import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http'
import{ViewFotoPage} from '../view-foto/view-foto';

/**
 * Generated class for the ViewImagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-image',
  templateUrl: 'view-image.html',
})
export class ViewImagePage {
  public items;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    let data = navParams.get('data');
    this.Search_image(data)
 
  }

 Search_image(data){

  var link = 'http://190.0.33.166/appmovil1/class/ViewImage.php';

  this.http.post(link, data).map(res => res.json()).subscribe(
    result => {
this.items=result;
console.log(result);

    },
    error => {
      console.log(error);
    }
  );
 }

 ViewImagen(ruta){
   console.log(ruta);
   this.navCtrl.push(ViewFotoPage, {
    ruta: ruta
  });

 }
}