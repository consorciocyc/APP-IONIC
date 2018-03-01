import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { ImagePicker } from '@ionic-native/image-picker';
import { Http } from '@angular/http'
import { ToastController } from 'ionic-angular';

import {IndexPage} from '../index/index';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //userDetails : any;
  //responseData: any;
  public usuario
  public password;
  public data:any = {};

  constructor(public navCtrl: NavController,public http   : Http,public toastCtrl: ToastController) {

  }

launchLoginPage(){

if(this.usuario==undefined || this.password==undefined ){
  
  let toast = this.toastCtrl.create({
    message: 'Campos Vacios',
    duration: 3000
  });
  toast.present();

   }   else{

    var link = 'http://190.0.33.166/appmovil1/class/login2.php';
    var myData = JSON.stringify({'usuario': this.usuario,'password':this.password,'tipoObra':1});

    this.http.post(link,myData)

    .subscribe(res => {

         localStorage.setItem('userData', res["_body"]);
         const data= JSON.parse(localStorage.getItem('userData'));
      if(data.status=="OK"){
     
       
        this.navCtrl.push(IndexPage);

      }else{

        this.presentToast();
      }
 
    }, error => {

    console.log("Oooops!");

   });
}
}

presentToast() {
  let toast = this.toastCtrl.create({
    message: 'Usuario o Contraseña Incorrectas',
    duration: 3000
  });
  toast.present();
}
}
