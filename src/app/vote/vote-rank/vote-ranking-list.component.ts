import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastService, InfiniteLoaderComponent, PTRComponent } from 'ngx-weui';

import { VoteService } from '../vote.service';
import { Voter } from '../voter';

@Component({
  selector: 'app-vote-ranking-list',
  templateUrl: './vote-ranking-list.component.html',
  styleUrls: ['./vote-ranking-list.component.less']
})
export class VoteRankingListComponent implements OnInit {

  @ViewChild(InfiniteLoaderComponent) il;

  private page = 0;
  voters: Voter[] = [];
  noData: boolean;

  constructor(
    private voteService: VoteService,
    private srv: ToastService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.getVoters();
  }

  getVoters(page: number = 0, comp?: PTRComponent): void {
    this.voteService.getRankingList(page)
      .subscribe(voters => {
        this.page = page;

        if (page === 0) {
          this.noData = false;
          this.voters = [];
        }

        if (voters.length === 0) {
          this.noData = true;
        } else {
          this.voters = this.voters.concat(voters);
        }
        comp && comp.setFinished('上次刷新：' + new Date().toLocaleString()); // tslint:disable-line
      });
  }

  onLoadMore(comp: InfiniteLoaderComponent): void {
    // this.getVoters(this.page + 1, comp);
  }

  onRefresh(ptr: PTRComponent) {
    this.getVoters(0, ptr);
  }
}
