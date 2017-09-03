import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';

import { CoWorkingSpace } from './../../models/coworkingmapresult.interface';
import { CoworkingmapProvider } from './../../providers/coworkingmap';
import { Subscription } from 'rxjs/Subscription';

// @IonicPage()
@Component({
  selector: 'page-space',
  templateUrl: 'space.html',
})
export class SpacePage {
  private spaces: CoWorkingSpace[];
  private spaceSubscription: Subscription = new Subscription();
  private loading: Loading;

  constructor(public navCtrl: NavController, private loadingCtrl: LoadingController,
    public navParams: NavParams, private spaceService: CoworkingmapProvider) {
  }  

  ionViewWillLeave() {
    // this.spaceSubscription.unsubscribe();
  }

  ionViewDidLoad() {
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    this.spaceService.getToken().subscribe(data => {
      this.spaceService.setToken(data.token);
      this.spaceSubscription = this.spaceService.getWorkingSpaceFilterByCountry('India')
        .subscribe(result => {
          this.loading.dismiss().then(data => {
            this.spaces = result;
          })
        });
    });
  }

}
