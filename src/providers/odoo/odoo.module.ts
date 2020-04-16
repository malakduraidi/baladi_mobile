import { CommonModule } from '@angular/common';
import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf
} from '@angular/core';

import { OdooJsonRPC } from './services/odooJsonRPC';
import { OdooAPI } from './services/odooAPI';

@NgModule({
  imports: [CommonModule],
  providers: [OdooJsonRPC, OdooAPI]
})
export class OdooModule {
  static forRoot(): ModuleWithProviders<OdooModule> {
    return {
      ngModule: OdooModule
    };
  }

  constructor(
    @Optional()
    @SkipSelf()
    parentModule: OdooModule
  ) {
    if (parentModule) {
      throw new Error(
        'ServiceModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
