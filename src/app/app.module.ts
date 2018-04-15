import { SpacePage } from './../pages/space/space';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
// import { GoogleMaps } from "@ionic-native/google-maps";
import { SplashScreen } from '@ionic-native/splash-screen';
import { SocialSharing } from '@ionic-native/social-sharing';
// import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { CoworkingmapProvider } from '../providers/coworkingmap';
import { Network } from '@ionic-native/network';

@NgModule({
  declarations: [
    MyApp,
    SpacePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SpacePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    // GoogleMaps,
    SocialSharing,
    Network,
    CoworkingmapProvider
  ]
})
export class AppModule { }
