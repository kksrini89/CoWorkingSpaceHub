import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Network } from '@ionic-native/network';

import { SpacePage } from "../pages/space/space";

@Component({
  templateUrl: 'app.html',
  styles: [`
  .fixed-content:{
background-color:#424242;
  }
  `]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SpacePage;

  pages: Array<{ title: string, component: any, icon: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private network: Network, private toast: ToastController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Space', component: SpacePage, icon: 'planet' },
      { title: 'About', component: 'AboutPage', icon: 'contact' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.network.onConnect().subscribe(() => {
        let toast = this.toast.create({
          message: `Connected via ${this.network.type}`,
          position: 'bottom',
          duration: 3000
        });
        toast.present();
      });
      // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
