import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { LoadingController } from 'ionic-angular';
import { ViewImagePage } from '../view-image/view-image';
import { FileChooser } from '@ionic-native/file-chooser';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public picker: ImagePicker,
    public transfer: FileTransfer,
    public file: File,
    public loadingCtrl: LoadingController,
    private fileChooser: FileChooser) {

    this.data = navParams.get('consec');
    this.direccion = this.data.obri_direccion;
    this.solicitante = this.data.obri_solicitante;
    this.consecutivo = this.data.obri_id_consecutivo;
    console.log(this.direccion);
  }

  choosePicture() {
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

      }, (err) => {
        console.log(err)
        // error
      })

  }
}
