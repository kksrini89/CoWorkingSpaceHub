import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';

import { CoworkingmapProvider } from './../../providers/coworkingmap';
import { CoWorkingSpaceResult } from './../../models/coworkingmapresult.interface';

@IonicPage()
@Component({
  selector: 'page-spacebycity',
  templateUrl: 'spacebycity.html',
})
export class SpacebycityPage {
  selectedCountry: string = 'india';
  selectedCity: string = '';
  spaces: CoWorkingSpaceResult[];
  loading: Loading;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private loadingCtrl: LoadingController, private spaceService: CoworkingmapProvider) {
    this.selectedCountry = this.navParams.get('selectedCountry');
    this.selectedCity = this.navParams.get('selectedCity');
    this.spaces = this.navParams.get('spaces');
  }

  GetSpaceDetail(space) {
    this.loading = this.loadingCtrl.create({
      content: 'Loading detail'
    });
    this.loading.present();
    this.spaceService.getWorkingSpaceDetail(this.selectedCountry, this.selectedCity, space.slug)
      .subscribe(data => {
        this.loading.dismiss().then(result => {
          //space detail page
          console.log(data);
        })
      })
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad SpacebycityPage');
  }

}
