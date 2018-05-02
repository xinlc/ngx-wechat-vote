import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastService, InfiniteLoaderComponent } from 'ngx-weui';

import { VoteService } from './vote.service';
import { AuthService } from '../core/auth.service';
import { Voter, Activity } from './voter';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.less']
})
export class VoteComponent implements OnInit {

  @ViewChild(InfiniteLoaderComponent) il;

  private page = 0;
  searchValue = '';
  voters: Voter[] = [];
  activity: Activity;
  noData: boolean;
  hasApproveAccess = false;

  constructor(
    private voteService: VoteService,
    private srv: ToastService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.getAccess();
    this.getVoters();
    this.getActivityInfo();
  }

  getVoters(page: number = 0, comp?: InfiniteLoaderComponent): void {
    comp && comp.resolveLoading(); // tslint:disable-line
    this.voteService.getVoteList(page, this.searchValue)
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

  getActivityInfo(): void {
    this.voteService.getActivityInfo()
      .subscribe(activity => this.activity = activity);
  }

  onLoadMore(comp: InfiniteLoaderComponent): void {
    this.getVoters(this.page + 1, comp);
  }

  search(): void {
  }

  onSearch(text: string) {
    this.onSubmit(text);
  }

  onCancel() {
    this.onClear();
  }

  onClear() {
    this.onSubmit('');
  }

  onSubmit(value: string) {
    this.searchValue = value;
    this.il.restart();
    this.getVoters(0);
  }

  vote(voter: Voter): void {
    this.voteService.vote(voter.id)
      .subscribe(
        () => {
          voter.numbers = `${Number(voter.numbers) + 1}`;
          this.srv.show('投票成功', 2000 );
        },
        ({ error = { msg: '报名失败，请稍后尝试' } }) => {
          const msg = error.msg;
          if (error.msg) {
            this.srv.show(msg, 2000, 'weui-icon-warn');
          }
        });
  }

  openDetail(item: Voter) {
    this.router.navigate(['/vote', item.id]);
  }

  getAccess() {
    this.voteService.getAccess()
      .subscribe((res: any) => {
        this.hasApproveAccess = res.hasApproveAccess;
      });
  }
}
