import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

import { CoWorkingSpaceResult, ResultMap } from './../../models/coworkingmapresult.interface';

declare var google:any;

@IonicPage()
@Component({
  selector: 'page-spacedetail',
  templateUrl: 'spacedetail.html',
})
export class SpacedetailPage {
  spaceDetail: CoWorkingSpaceResult;
  @ViewChild('map') mapElement: ElementRef;
  map:any;
  marker:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private socialShare: SocialSharing, private toastCtrl: ToastController) {
    this.spaceDetail = this.navParams.get('space-detail');
  }

  ionViewDidEnter(): void {
    this.locateSpaceInMap(this.spaceDetail.map);
  }

  ionViewDidLoad():void {

  }

  /**
   * Loading Google Map
   * @param loc ResultMap
   */
  locateSpaceInMap(loc: ResultMap): void {
    let latlng = new google.maps.LatLng(+loc.lat, +loc.lng);
    let mapOptions = {
      center: latlng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement,mapOptions);
    this.marker = new google.maps.Marker({
      position: latlng,
      map: this.map,
      title: this.spaceDetail.name,
      animation: google.maps.Animation.DROP
    });
    this.marker.addListener('click',this.toggleBounce);
  }

  private toggleBounce(): void {
    if (this.marker.getAnimation() !== null) {
      this.marker.setAnimation(null);
    } else {
      this.marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }

  /**
   * Share CoWorkSpace details to user
   * @param detail CoWorkingSpaceResult
   */
  ShareViaWhatsapp(detail: CoWorkingSpaceResult): void {
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
}
