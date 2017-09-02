import { NgModule } from '@angular/core';
import { IonicModule, IonicPageModule } from 'ionic-angular';
import { SpacePage } from './space';

@NgModule({
  declarations: [
    SpacePage,
  ],
  imports: [
    IonicPageModule.forChild(SpacePage),
    IonicModule
  ],
})
export class SpacePageModule { }
