import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { UploadImagePage } from "./upload-image";
import { Geolocation } from "@ionic-native/geolocation";
@NgModule({
  declarations: [UploadImagePage],
  imports: [Geolocation, IonicPageModule.forChild(UploadImagePage)]
})
export class UploadImagePageModule {}
