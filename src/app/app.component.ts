import { Component, ViewChild } from "@angular/core";
import { Platform, Nav } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { SearchPage } from "../pages/search/search";
import { BuscarPage } from "../pages/buscar/buscar";
import { HomePage } from "../pages/home/home";
import { IndexPage } from "../pages/index/index";
import { ActasPage } from "../pages/actas/actas";
import { App, MenuController } from "ionic-angular";
import {OymPage} from "../pages/oym/oym";
import{SearchOymPage} from "../pages/search-oym/search-oym"

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any = HomePage;
  @ViewChild(Nav) nav: Nav;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public menuCtrl: MenuController
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.menuCtrl.enable(true);
  }

  OnSearch() {
    this.nav.setRoot(SearchPage);
    this.menuCtrl.close();
  }

  OnSearchB() {
    this.nav.setRoot(BuscarPage);
    this.menuCtrl.close();
  }

  actasview() {
    this.nav.setRoot(ActasPage);
    this.menuCtrl.close();
  }

  search_oym(){
    this.nav.setRoot(SearchOymPage);
    this.menuCtrl.close();
  }

  closeMenu() {
    this.menuCtrl.close();
  }
  OnSearchHome() {
    this.nav.setRoot(IndexPage);
    this.menuCtrl.close();
  }

  closeSesion() {
    localStorage.clear();
    this.nav.setRoot(HomePage);
    this.menuCtrl.enable(false);
  }

  oym() {
    this.nav.setRoot(OymPage);
    this.menuCtrl.close();
  }
}
