import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from "../../servicio/servicios";
import {UploadyomPage} from "../uploadyom/uploadyom";
/**
 * Generated class for the OymPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-oym',
  templateUrl: 'oym.html',
  providers: [UserService]
})
export class OymPage {

public data;
public items;

  constructor(public navCtrl: NavController, public navParams: NavParams,private userService: UserService) {
    this.sear();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OymPage');
  }

  sear() {
    this.data = localStorage.getItem("cedula");
    let params = { cedula: this.data };
    this.userService.searchprogramming_oym(params).subscribe(
      result => {
        this.items = result.response;
      },
      error => {}
    );
  }

  itemSelected(consec) {
    console.log(consec);
    this.navCtrl.push(UploadyomPage, {
      consec: consec
    });
  }

}
