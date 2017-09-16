import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { SpacebycityPage } from './spacebycity';

@NgModule({
  declarations: [
    SpacebycityPage,
  ],
  imports: [
    IonicModule,
    IonicPageModule.forChild(SpacebycityPage),
  ],
})
export class SpacebycityPageModule { }
