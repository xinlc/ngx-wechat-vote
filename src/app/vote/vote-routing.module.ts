
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VoteComponent } from './vote.component';
import { VoteDetailComponent } from './vote-detail/vote-detail.component';
import { VoteJoinComponent } from './vote-join/vote-join.component';

const voteRoutes: Routes = [
  {
    path: '',
    children: [
      { path: 'join', component: VoteJoinComponent },
      { path: ':id', component: VoteDetailComponent },
      { path: '', component: VoteComponent },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(voteRoutes)
  ],
  exports: [ RouterModule ]
})
export class VoteRoutingModule { }
