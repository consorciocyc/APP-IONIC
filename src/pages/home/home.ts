import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//import { ImagePicker } from '@ionic-native/image-picker';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { ToastController } from 'ionic-angular';

import {IndexPage} from '../index/index';
import {UserService} from '../../servicio/servicios';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [UserService]
})
export class HomePage {

  //userDetails : any;
  //responseData: any;
  public usuario
  public password;
  public data:any = {};

  constructor(public navCtrl: NavController,public http   : Http,public toastCtrl: ToastController, private userService: UserService) {
  
 this.data= localStorage.getItem('cedula');
if(this.data==undefined){


}else{
  this.navCtrl.push(IndexPage);
}
  }




launchLoginPage(){

if(this.usuario==undefined || this.password==undefined ){
  
  let toast = this.toastCtrl.create({
    message: 'Campos Vacios',
    duration: 3000
  });
  toast.present();

   }   else{



    var link = 'api/user/session_movil';
   

    let data={'usuario': this.usuario,'password':this.password}

    this.userService.login(data).subscribe(result=>{

      if(result.status=="ok"){
     
        localStorage.setItem('cedula', result.data.usuario_cedula);
        localStorage.setItem('nombre', result.data.usuario_name);

        this.navCtrl.push(IndexPage);

      }else{

        this.presentToast();
      }
    },error=>{})

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
