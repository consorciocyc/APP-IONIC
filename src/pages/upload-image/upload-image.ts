import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { LoadingController } from 'ionic-angular';
import { ViewImagePage } from '../view-image/view-image';
import { FileChooser } from '@ionic-native/file-chooser';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the UploadImagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload-image',
  templateUrl: 'upload-image.html',
})
export class UploadImagePage {

  public data
  public image;
  public image2;
  public imagen;
  public rowDataHomeForm = [];
  public solicitante;
  public direccion;
  public consecutivo;
  public tel;
  public Send_pdf;
  public municipio;
  public obri_tel_instalacion;
  public imagenbotton;
  public pdfbotton;

  constructor(public navCtrl: NavController, public navParams: NavParams, public picker: ImagePicker,
    public transfer: FileTransfer,
    public file: File,
    public loadingCtrl: LoadingController,
    private fileChooser: FileChooser,
    public toastCtrl: ToastController) {

    this.data = navParams.get('consec');
    this.direccion = this.data.obri_direccion;
    this.solicitante = this.data.obri_solicitante;
    this.consecutivo = this.data.obri_id_consecutivo;
    this.municipio = this.data.municipio;
    this.obri_tel_instalacion = this.data.obri_tel_instalacion;
    console.log(this.direccion);

    this.imagenbotton = true;
    this.pdfbotton = true;
  }

  choosePicture() {
    this.imagenbotton = false;
    this.rowDataHomeForm = []
    this.respuesta = '';

    let options = {
      title: 'selecionar imagen',
      message: 'select 1',
      maximumImagesCount: 9,
      outType: 0,
      width: 1920,
      height: 1080,
      quality: 95
    }

    this.picker.getPictures(options).then((_imagePath) => {
      this.image = _imagePath;
      this.image2 = _imagePath;

      for (var i = 0; i < this.image2.length; i++) {

        this.rowDataHomeForm.push({ imagenes: this.image2[i] })
        console.log(this.rowDataHomeForm)

      }

    }, (err) => { });


  }

  public respuesta;

  Send() {

    this.imagenbotton = true;
    let loader = this.loadingCtrl.create({
      content: "Please wait...",

    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: 'name.jpg',
      headers: {},
      params: { 'params': this.data }

    }
    let numero;
    for (var i = 0; i < this.image.length; i++) {

      fileTransfer.upload(this.image[i], 'http://190.0.33.166/appmovil1/class/cargarDocumentos2.php', options)
        .then((data) => {
          console.log(data);
          this.respuesta = data.responseCode;

        }, (err) => {
          console.log(err)
          // error
        })
    }

    if (i == this.image.length) {

      loader.dismiss();
    }

    //let reader = new FileReader();

  }


  ViewImage() {

    this.navCtrl.push(ViewImagePage, {
      data: this.data
    });
  }


  pdf() {
    this.pdfbotton = false;
    this.fileChooser.open()
      .then(

        uri =>
          this.Send_pdf = uri
      )
      .catch(
        e => console.log(e)
      );
  }

  Sendpdf() {
    let loader = this.loadingCtrl.create({
      content: "Por favor Espere...",

    });
    loader.present();
    this.pdfbotton = true;
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: 'name.pdf',
      headers: {},
      params: { 'params': this.data }

    }

    fileTransfer.upload(this.Send_pdf, 'http://190.0.33.166/appmovil1/class/cargarDocumentos2.php', options)
      .then((data) => {

        console.log(data);

        this.respuesta = data.responseCode;
        if (this.respuesta != 200) {


        } else {

          this.presentToast();
          loader.dismiss();
        }
      }, (err) => {
        console.log(err)
        // error
      })

  }


  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Se ha Guardado el Archivo',
      duration: 3000
    });
    toast.present();
  }
}
