import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService, InfiniteLoaderComponent } from 'ngx-weui';

import { VoteService } from '../vote.service';
import { Voter } from '../voter';

@Component({
  selector: 'app-approve',
  templateUrl: './vote-approve.component.html',
  styleUrls: ['./vote-approve.component.less']
})
export class VoteApproveComponent implements OnInit {
  @ViewChild(InfiniteLoaderComponent) il;
  voters: Voter[];
  page: number;
  noData: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private voteService: VoteService,
    private srv: ToastService
  ) { }

  ngOnInit() {
    this.getVoters();
  }

  getVoters(page: number = 0, comp?: InfiniteLoaderComponent): void {
    comp && comp.resolveLoading(); // tslint:disable-line
    this.voteService.getNeedapprovelist(page)
      .subscribe(voters => {
        this.page = page;

        if (page === 0) {
          this.noData = false;
          this.voters = [];
        }

        if (voters.length === 0) {
          this.noData = true;
          comp && comp.setFinished(); // tslint:disable-line
        } else {
          this.voters = this.voters.concat(voters);
        }
      });
  }

  onLoadMore(comp: InfiniteLoaderComponent): void {
    this.getVoters(this.page + 1, comp);
  }

  onPass(item: Voter) {
    this.voteService.pass(item.id)
      .subscribe((res) => {
        this.srv.show('审核通过');
      }, ({ error = { msg: '操作失败，请稍后尝试' } }) => {
        const msg = error.msg;
        this.srv.show(msg, 2000, 'weui-icon-warn');
        console.log(error);
      });
  }


}

