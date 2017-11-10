import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {
  GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions
} from '@ionic-native/google-maps';
import { SocialSharing } from '@ionic-native/social-sharing';

import { CoWorkingSpaceResult, ResultMap } from './../../models/coworkingmapresult.interface';

@IonicPage()
@Component({
  selector: 'page-spacedetail',
  templateUrl: 'spacedetail.html',
})
export class SpacedetailPage {
  spaceDetail: CoWorkingSpaceResult;
  map: GoogleMap;
  mapElement: HTMLElement;

  constructor(public navCtrl: NavController, public navParams: NavParams, private socialShare: SocialSharing, private toastCtrl: ToastController,
    private googleMaps: GoogleMaps) {
    this.spaceDetail = this.navParams.get('space-detail');
    console.log(this.spaceDetail);
  }

  ionViewDidEnter() {
    this.locateSpaceInMap(this.spaceDetail.map);
  }

  locateSpaceInMap(loc: ResultMap) {
    this.mapElement = document.getElementById('map');
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: +loc.lat,
          lng: +loc.lng
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = this.googleMaps.create(this.mapElement, mapOptions);
    this.map.setMapTypeId('MAP_TYPE_NORMAL');
    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');

        // Now you can use all methods safely.
        this.map.addMarker({
          title: this.spaceDetail.name,
          icon: 'blue',
          animation: 'DROP',
          position: {
            lat: +loc.lat,
            lng: +loc.lng
          }
        })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                alert('clicked');
              });
          });
      });
  }

  ShareViaWhatsapp(detail: CoWorkingSpaceResult) {
    console.log(detail);
    this.socialShare.shareViaWhatsApp(this.spaceDetail.name + "\n" + this.spaceDetail.map.address, this.spaceDetail.logo, null)
      .then(result => {
        let toast = this.toastCtrl.create({
          message: 'Shared the location!',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      });
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad SpacedetailPage');
  }

}
