
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { CommonModule } from '@angular/common';

import { UserService, UserServiceConfig } from './data/user.service';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';

@NgModule({
  declarations: [],
  imports: [ CommonModule ],
  exports: [],
  providers: [
    UserService,
    SelectivePreloadingStrategy
  ]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(config: UserServiceConfig): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        {provide: UserServiceConfig, useValue: config }
      ]
    };
  }
}
