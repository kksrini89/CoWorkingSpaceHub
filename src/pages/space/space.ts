import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading, IonicPage } from 'ionic-angular';

import { CoWorkingSpaceResult } from './../../models/coworkingmapresult.interface';
import { CoworkingmapProvider } from './../../providers/coworkingmap';
import { Subscription } from 'rxjs/Subscription';

@IonicPage()
@Component({
  selector: 'page-space',
  templateUrl: 'space.html',
})
export class SpacePage {
  // private spaces: CoWorkingSpace[];
  private spaces: any[];
  private spaceSubscription: Subscription = new Subscription();
  private loading: Loading;

  searchInput: string = '';

  constructor(public navCtrl: NavController, private loadingCtrl: LoadingController,
    public navParams: NavParams, private spaceService: CoworkingmapProvider) {
  }

  OnInput(event: any) {
    let tempSpace = this.spaceService.getCitites();
    let inputValue = event.target.value;
    if (inputValue && inputValue.trim() !== '') {
      this.spaces = tempSpace.filter(item => {
        return (item.toString().toLowerCase().indexOf(inputValue.toLowerCase()) > -1)
      });
    }
  }

  OnCancel(event: any) {
    this.spaces = this.spaceService.getCitites();
  }

  searchByCity(city: string) {
    let spaces: CoWorkingSpaceResult[];
    this.loading = this.loadingCtrl.create({
      content: 'Loading spaces...'
    });
    this.loading.present();
    this.spaceService.getWorkingSpaceFilterByCity('india', city)
      .subscribe(data => {
        spaces = data;
        this.loading.dismiss().then(data => {
          this.navCtrl.push('SpacebycityPage', { 'selectedCountry': 'india', 'selectedCity': city, 'spaces': spaces });
        })
      });
  }

  private loadDistinctCities(result) {
    let temp = [];
    result.filter(item => {
      if (temp.indexOf(item.city) == -1)
        temp.push(item.city);
    });
    return temp;
  }


  ionViewWillEnter() {
    this.loading = this.loadingCtrl.create({
      content: 'Loading cities...'
    });
    this.loading.present();

    let token = this.spaceService.getToken();
    if (token !== null && token !== undefined) {
      this.spaceSubscription = this.spaceService.getWorkingSpaceFilterByCountry('India')
        .subscribe(result => {
          this.loading.dismiss().then(data => {
            this.spaces = this.loadDistinctCities(result);
            this.spaceService.setCities(this.spaces);
            // this.cities = result;
          })
        });
    } else {
      this.spaceService.getTokenObservable().subscribe(data => {
        this.spaceService.setToken(data.token);
        this.spaceSubscription = this.spaceService.getWorkingSpaceFilterByCountry('India')
          .subscribe(result => {
            this.loading.dismiss().then(data => {
              this.spaces = this.loadDistinctCities(result);
              this.spaceService.setCities(this.spaces);
              // this.cities = result;
            })
          });
      });
    }
  }

  ionViewWillLeave() {
    this.spaces = [];
    this.spaceSubscription.unsubscribe();
  }

  ionViewDidLoad() {
    // this.loading = this.loadingCtrl.create();
    // this.loading.present();
    // this.spaceService.getToken().subscribe(data => {
    //   this.spaceService.setToken(data.token);
    //   this.spaceSubscription = this.spaceService.getWorkingSpaceFilterByCountry('India')
    //     .subscribe(result => {
    //       this.loading.dismiss().then(data => {
    //         this.spaces = result;
    //       })
    //     });
    // });
  }

}
