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
import proj4 from "proj4";
import {
  LaunchNavigator,
  LaunchNavigatorOptions
} from "@ionic-native/launch-navigator";
import {
  Geolocation,
  GeolocationOptions,
  Geoposition,
  PositionError
} from "@ionic-native/geolocation";
/**
 * Generated class for the UploadImagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-upload-image",
  templateUrl: "upload-image.html"
})
export class UploadImagePage {
  @ViewChild("ruta") private ruta: ElementRef;
  public data;
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
  public Instalacion;
  public imagenbotton;
  public pdfbotton;
  public idwork;
  public firstProjection;
  public falso = true;
  public x;
  public y;
  public cordenadas;
  public lat;
  public lon;
  public destination;
  public disabled = true;
  public latitude: number;
  public longitude: number;
  public respuesta = true;
  destina: any = [23.022505, 72.571362]; // dest lat,long
  options: GeolocationOptions;
  currentPos: Geoposition;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public picker: ImagePicker,
    public transfer: FileTransfer,
    public file: File,
    public loadingCtrl: LoadingController,
    private fileChooser: FileChooser,
    public toastCtrl: ToastController,
    private geolocation: Geolocation,
    private launchNavigator: LaunchNavigator,
    private renderer: Renderer2,
    hostElement: ElementRef
  ) {
    this.firstProjection =
      'PROJCS["MAGNA-SIRGAS / Colombia Bogota zone",GEOGCS["MAGNA-SIRGAS",DATUM["Marco_Geocentrico_Nacional_de_Referencia",SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],TOWGS84[0,0,0,0,0,0,0],AUTHORITY["EPSG","6686"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4686"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",4.596200416666666],PARAMETER["central_meridian",-74.07750791666666],PARAMETER["scale_factor",1],PARAMETER["false_easting",1000000],PARAMETER["false_northing",1000000],UNIT["metre",1,AUTHORITY["EPSG","9001"]],AUTHORITY["EPSG","3116"]]';
    this.data = navParams.get("consec");
    this.direccion = this.data.Direccion;
    this.solicitante = this.data.Solicitante;
    this.consecutivo = this.data.consecutive;
    this.municipio = this.data.name_municipality;
    this.Instalacion = this.data.Instalacion;
    this.idwork = this.data.idworkI;
    this.x = this.data.x;
    this.y = this.data.y;
    this.imagenbotton = true;
    this.pdfbotton = true;

    this.cordenadas = proj4(this.firstProjection).inverse([
      Number(this.x),
      Number(this.y)
    ]);

    this.lat = this.cordenadas[1];
    this.lon = this.cordenadas[0];
    this.destination = this.lat + "," + this.lon;
  }

  getUserPosition() {
    this.geolocation.getCurrentPosition().then(
      position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      },
      error => {
        console.log("error", error);
      }
    );
  }

  irhasta() {
    this.getUserPosition();
    let options: LaunchNavigatorOptions = {
      app: this.launchNavigator.APP.GOOGLE_MAPS,
      start: [this.latitude, this.longitude]
    };

    this.launchNavigator.navigate(this.destination, options);
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
        this.image2 = _imagePath;

        for (var i = 0; i < this.image2.length; i++) {
          this.rowDataHomeForm.push({ imagenes: this.image2[i] });
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
          "http://190.0.33.166:85/sip/public/api/movil/send_image",
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

  ViewImage() {
    this.navCtrl.push(ViewImagePage, {
      data: this.data
    });
  }

  pdf() {
    this.pdfbotton = false;
    this.fileChooser
      .open()
      .then(uri => (this.Send_pdf = uri))
      .catch(e => console.log(e));
  }

  Sendpdf() {
    let loader = this.loadingCtrl.create({
      content: "Por favor Espere..."
    });
    loader.present();
    this.pdfbotton = true;
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: "file",
      fileName: "name.pdf",
      headers: {},
      params: { params: this.data }
    };

    fileTransfer
      .upload(
        this.Send_pdf,
        "http://190.0.33.166/appmovil1/class/cargarDocumentos2.php",
        options
      )
      .then(
        data => {
          console.log(data);
        },
        err => {
          console.log(err);
          // error
        }
      );
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: "Se ha Guardado el Archivo",
      duration: 3000
    });
    toast.present();
  }
}
