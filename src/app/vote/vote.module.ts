import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { WeUiModule } from 'ngx-weui';
import { SharedModule } from '../shared/shared.module';
import { VoteRoutingModule } from './vote-routing.module';

import { VoteService } from './vote.service';

import { VoteComponent } from './vote.component';
import { VoteDetailComponent } from './vote-detail/vote-detail.component';
import { VoteJoinComponent } from './vote-join/vote-join.component';
import { VoteRankingListComponent } from './vote-rank/vote-ranking-list.component';
import { VoteApproveComponent } from './vote-approve/vote-approve.component';


@NgModule({
  declarations: [
    VoteComponent,
    VoteDetailComponent,
    VoteJoinComponent,
    VoteRankingListComponent,
    VoteApproveComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    SharedModule,
    VoteRoutingModule,
    WeUiModule,
  ],
  exports: [
  ],
  providers: [
    VoteService,
  ],
})
export class VoteModule { }

