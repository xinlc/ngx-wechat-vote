
import { NgModule } from '@angular/core';
import { RouterModule, Routes, } from '@angular/router';

import { PageNotFoundComponent } from './components/page-not-found.component';

import { LoginComponent } from './login/login.component';

import { SelectivePreloadingStrategy } from './core/selective-preloading-strategy';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'vote',
    loadChildren: 'app/vote/vote.module#VoteModule',
    data: { preload: true }
  },
  { path: '', redirectTo: '/vote', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        enableTracing: false,  // <-- debugging purposes only
        preloadingStrategy: SelectivePreloadingStrategy
      }
    )
  ],
  exports: [ RouterModule ],
  providers: [
    SelectivePreloadingStrategy,
  ]
})
export class AppRoutingModule { }
