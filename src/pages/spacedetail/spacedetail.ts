import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

import { CoWorkingSpaceResult } from './../../models/coworkingmapresult.interface';

@IonicPage()
@Component({
  selector: 'page-spacedetail',
  templateUrl: 'spacedetail.html',
})
export class SpacedetailPage {

  spaceDetail: CoWorkingSpaceResult;
  constructor(public navCtrl: NavController, public navParams: NavParams, private socialShare: SocialSharing, private toastCtrl: ToastController) {
    this.spaceDetail = this.navParams.get('space-detail');
    this.socialShare.shareViaWhatsApp(this.spaceDetail.map.address, this.spaceDetail.logo, null)
      .then(result => {
        let toast = this.toastCtrl.create({
          message: 'Shared the location!',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      });
    // console.log(this.spaceDetail);
  }

  ShareViaWhatsapp(detail: CoWorkingSpaceResult) {
    console.log(detail);
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad SpacedetailPage');
  }

}
