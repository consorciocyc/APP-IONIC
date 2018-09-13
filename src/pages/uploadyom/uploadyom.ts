
import { Component, ElementRef, Renderer2, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ImagePicker } from "@ionic-native/image-picker";
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject
} from "@ionic-native/file-transfer";
import { File } from "@ionic-native/file";
import { LoadingController } from "ionic-angular";
import { ViewImagePage } from "../view-image/view-image";
import { FileChooser } from "@ionic-native/file-chooser";
import { ToastController } from "ionic-angular";
/**
 * Generated class for the UploadyomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-uploadyom',
  templateUrl: 'uploadyom.html',
})
export class UploadyomPage {

  public respuesta;
  public falso;
  public imagenbotton;
  public rowDataHomeForm;
  public image
  public data;
  public phone;
  public solicitante;
  public consecutivo;
  public municipio;
  public pedido;

  constructor(public navCtrl: NavController, public navParams: NavParams,

    public picker: ImagePicker,
    public transfer: FileTransfer,
    public file: File,
    public loadingCtrl: LoadingController,
    private fileChooser: FileChooser,
    public toastCtrl: ToastController,

  ) {
    this.data = navParams.get("consec");

    this.consecutivo = this.data.consecutive;
    this.pedido = this.data.pedido;
    this.solicitante = this.data.user;
    this.phone = this.data.phone;
    this.municipio = this.data.name_municipality;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadyomPage');
  }

  choosePicture() {
    this.respuesta = true;
    this.falso = true;
    this.imagenbotton = false;
    this.rowDataHomeForm = [];
    

    let options = {
      title: "selecionar imagen",
      message: "select 1",
      maximumImagesCount: 9,
      outType: 0,
      width: 1920,
      height: 1080,
      quality: 95
    };

    this.picker.getPictures(options).then(
      _imagePath => {
        this.image = _imagePath;

        for (var i = 0; i < this.image.length; i++) {
          this.rowDataHomeForm.push({ imagenes: this.image[i] });
        }
      },
      err => {}
    );
  }

  Send() {
    this.imagenbotton = true;
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: "file",
      fileName: "name.jpg",
      headers: {},
      params: { params: this.data }
    };

    for (var i = 0; i < this.image.length; i++) {
      fileTransfer
        .upload(
          this.image[i],
          "http://190.0.33.166:85/sip/public/api/movil/send_image_oym",
          options
        )
        .then(
          data => {
            var json = JSON.parse(data.response);
            if (json.response == true) {
              this.respuesta = false;
            } else {
              this.falso = false;
            }
          },
          err => {
            console.log(err);
            // error
          }
        );
    }

    if (i == this.image.length) {
      loader.dismiss();
    }

    //let reader = new FileReader();
  }



}
