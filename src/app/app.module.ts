import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material';
import { WeUiModule } from 'ngx-weui';

import { HttpErrorHandler } from './core/http-error-handler.service';
import { MessageService } from './core/message.service';
import { AuthService } from './core/auth.service';
import { httpInterceptorProviders } from './core/http-interceptors/index';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './components/page-not-found.component';

// 本地服务, 替代 mock
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),

    FlexLayoutModule,
    WeUiModule.forRoot(),
    MatButtonModule,
    CoreModule.forRoot({ userName: 'Leo'}),
    AppRoutingModule,
  ],
  providers: [
    HttpErrorHandler,
    MessageService,
    AuthService,
    httpInterceptorProviders,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

