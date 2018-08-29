import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Http } from "@angular/http";
import { UploadImagePage } from "../upload-image/upload-image";
import { ImagePicker } from "@ionic-native/image-picker";
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject
} from "@ionic-native/file-transfer";
import { File } from "@ionic-native/file";
import { LoadingController } from "ionic-angular";
import { ToastController } from "ionic-angular";
import { Camera, CameraOptions } from "@ionic-native/camera";
/**
 * Generated class for the ActasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-actas",
  templateUrl: "actas.html"
})
export class ActasPage {
  public id_oti;
  public list;
  public contractos;

  public respuesta = true;
  public falso = true;
  public imagenbotton = true;
  public rowDataHomeForm = [];
  public image2;
  public imagen;
  public image;
  public dir;
  public params;
  public idacta;
  public imagecamera: string = null;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public picker: ImagePicker,
    public transfer: FileTransfer,
    public file: File,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private camera: Camera
  ) {
    this.contractos = 7;
  }

  ionViewDidLoad() {}

  choosePicture() {
    this.respuesta = true;
    this.falso = true;
    this.rowDataHomeForm = [];

    let options = {
      title: "selecionar imagen",
      message: "select 1",
      maximumImagesCount: 40,
      outType: 0,
      width: 1920,
      height: 1080,
      quality: 95
    };

    this.picker.getPictures(options).then(
      _imagePath => {
        this.image = _imagePath;
        this.image2 = _imagePath;
        console.log(this.image2);

        for (var i = 0; i < this.image2.length; i++) {
          this.rowDataHomeForm.push({ imagenes: this.image2[i] });

          var newstr = this.image2[i].replace(
            "file:///data/user/0/io.ionic.starter/cache/tmp_",
            ""
          );

          let name = newstr.substr(0, 19);

          let image = name + ".jpg";
          let image1 = name + ".jpg_old";
          this.file
            .checkDir(this.file.externalRootDirectory + "/DCIM/", this.dir)
            .then(_ =>
              this.file
                .copyFile(
                  this.file.externalRootDirectory + "/DCIM/Camera",
                  image,
                  this.file.externalRootDirectory + "/DCIM/" + this.dir,
                  image1
                )
                .then(_ =>
                  this.file
                    .removeFile(
                      this.file.externalRootDirectory + "/DCIM/Camera",
                      image
                    )
                    .then(_ => console.log("Eliminado exists"))
                    .catch(err => console.log("error Al eliminar"))
                )
                .catch(err => console.log("ERROR AL COPIAR IMAGEN"))
            )
            .catch(err =>
              this.file
                .createDir(
                  this.file.externalRootDirectory + "/DCIM/",
                  this.dir,
                  this.dir
                )
                .then(_ =>
                  this.file
                    .copyFile(
                      this.file.externalRootDirectory + "/DCIM/Camera",
                      image,
                      this.file.externalRootDirectory + "/DCIM/" + this.dir,
                      image1
                    )
                    .then(_ =>
                      this.file
                        .removeFile(
                          this.file.externalRootDirectory + "/DCIM/Camera",
                          image
                        )
                        .then(_ => console.log("Eliminado exists"))
                        .catch(err => console.log("error Al eliminar"))
                    )
                    .catch(err => console.log("ERROR AL COPIAR IMAGEN"))
                )
                .catch(err => console.log("ERROR CREAR "))
            );
        }
        this.imagenbotton = false;
      },
      err => {}
    );
  }

  search_obr() {
    console.log(this.contractos);
    if (this.contractos == undefined) {
      this.contract();
      return;
    }
    var link = "http://190.0.33.166:85/sip/public/api/external/oti_movil";
    //var link = "http://190.0.33.166:85/sip/public/api/movil/search_consec";

    var myData = { id_oti: this.id_oti, idcontrac: this.contractos };

    this.http
      .post(link, myData)
      .map(res => res.json())
      .subscribe(
        result => {
          this.list = result.response;
        },
        error => {
          console.log(error);
        }
      );
  }

  Sendimage() {
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
      params: { params: this.list[0], idacta: this.idacta }
    };

    for (var i = 0; i < this.image.length; i++) {
      fileTransfer
        .upload(
          this.image[i],
          "http://190.0.33.166:85/sip/public/api/external/acta_image",
          options
        )
        .then(
          data => {
            var json = JSON.parse(data.response);
            if (json.response == true) {
              this.respuesta = false;
              console.log(this.image[i]);
              this.imagenbotton = true;
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

  create_acta() {
    var link = "http://190.0.33.166:85/sip/public/api/external/create_acta";
    //var link = "http://190.0.33.166:85/sip/public/api/movil/search_consec";

    var myData = { id_oti: this.list[0].idobr_anillos, dir: this.dir };

    this.http
      .post(link, myData)
      .map(res => res.json())
      .subscribe(
        result => {
          if (result.response == false) {
            this.presentToast();
            this.idacta = result.id_acta;
          }
          if (result.response == true) {
            this.presentToast2();
            this.idacta = result.id_acta;
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: "Acta ya Existe",
      duration: 3000
    });
    toast.present();
  }

  presentToast2() {
    let toast = this.toastCtrl.create({
      message: "Acta Creada",
      duration: 3000
    });
    toast.present();
  }

  contract() {
    let toast = this.toastCtrl.create({
      message: "Seleccione un Contrato",
      duration: 3000
    });
    toast.present();
  }
}
