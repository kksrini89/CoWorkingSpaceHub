import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CoWorkingSpaceResult } from './../../models/coworkingmapresult.interface';

@IonicPage()
@Component({
  selector: 'page-spacedetail',
  templateUrl: 'spacedetail.html',
})
export class SpacedetailPage {

  spaceDetail: CoWorkingSpaceResult;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.spaceDetail = this.navParams.get('space-detail');
    console.log(this.spaceDetail);
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad SpacedetailPage');
  }

}
