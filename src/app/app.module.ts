import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { HttpModule } from "@angular/http";

import { IndexPage } from "../pages/index/index";
import { SearchPage } from "../pages/search/search";
import { ViewPage } from "../pages/view/view";
import { UploadImagePage } from "../pages/upload-image/upload-image";
import { ViewImagePage } from "../pages/view-image/view-image";
import { ViewFotoPage } from "../pages/view-foto/view-foto";
import { Geolocation } from "@ionic-native/geolocation";
import { LaunchNavigator } from "@ionic-native/launch-navigator";
import { ImagePicker } from "@ionic-native/image-picker";
import { OymPage } from "../pages/oym/oym";
import { UploadyomPage } from "../pages/uploadyom/uploadyom";
import { ViewoymPage } from "../pages/viewoym/viewoym";
import {SearchOymPage} from "../pages/search-oym/search-oym";
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject
} from "@ionic-native/file-transfer";
import { File } from "@ionic-native/file";
import { FileChooser } from "@ionic-native/file-chooser";
import { BuscarPage } from "../pages/buscar/buscar";

import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { ActasPage } from "../pages/actas/actas";
import { Camera } from "@ionic-native/camera";
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    IndexPage,
    SearchPage,
    ViewPage,
    OymPage,
    UploadImagePage,
    ViewImagePage,
    ViewFotoPage,
    BuscarPage,
    UploadyomPage,
    ActasPage,
    ViewoymPage,
    SearchOymPage
  ],
  imports: [BrowserModule, HttpModule, IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    IndexPage,
    SearchPage,
    ViewPage,
    OymPage,
    UploadImagePage,
    ViewImagePage,
    ViewFotoPage,
    BuscarPage,
    UploadyomPage,
    ActasPage,
    ViewoymPage,
    SearchOymPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ImagePicker,
    FileTransfer,
    FileTransferObject,
    FileChooser,
    Geolocation,
    LaunchNavigator,
    Camera,
    File,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
