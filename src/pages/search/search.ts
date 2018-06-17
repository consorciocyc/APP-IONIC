import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{ViewPage} from '../view/view';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  public f = new Date();
  public mes=this.f.getMonth() +1;
  public dia=this.f.getDate();
  public select;
  public month: String;
  public month2: String;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    let mes;
    let dia;
    
    if(this.mes<10){
      
        mes='0'+this.mes;
    }else{

       mes=this.mes;
    }
    if(this.dia<10){
      dia='0'+this.dia;
  }else{

     dia=this.dia;
  }
    var fecha= (this.f.getFullYear() + "-" + mes + "-" +  dia);
    this.month=fecha;
    this.month2=fecha;
  }


  OnSearch(){
    this.navCtrl.push(ViewPage, {
      month: this.month,
      month2: this.month2,
      select: this.select
    });
  }

  Onright(){

    this.navCtrl.push(ViewPage);
  }

}
