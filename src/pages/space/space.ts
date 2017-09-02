import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CoWorkingSpace } from './../../models/coworkingmapresult.interface';
import { CoworkingmapProvider } from './../../providers/coworkingmap';
import { Subscription } from 'rxjs/Subscription';

@IonicPage()
@Component({
  selector: 'page-space',
  templateUrl: 'space.html',
})
export class SpacePage {
  private spaces: CoWorkingSpace[];
  private spaceSubscription: Subscription = new Subscription();

  constructor(public navCtrl: NavController,
    public navParams: NavParams, private spaceService: CoworkingmapProvider) {
  }

  ngOnInit() {
    this.spaceSubscription = this.spaceService.getWorkingSpaceFilterByCountry('India')
      .subscribe(result => this.spaces = result);
  }

  ionViewWillLeave() {
    this.spaceSubscription.unsubscribe();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpacePage');
  }

}
