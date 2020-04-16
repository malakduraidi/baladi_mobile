import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

// Store
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { effects, reducers } from './store';

@NgModule({
  imports: [
    IonicModule,
    EffectsModule.forFeature(effects),
    StoreModule.forFeature('error', reducers)
  ]
})
export class ErrorModule {}
