import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ToastService } from 'ngx-weui';

import { VoteService } from '../vote.service';
import { Voter } from '../voter';

@Component({
  selector: 'app-vote-detail',
  templateUrl: './vote-detail.component.html',
  styleUrls: ['./vote-detail.component.less']
})
export class VoteDetailComponent implements OnInit {
  detail: Voter;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private voteService: VoteService,
    private srv: ToastService
  ) { }

  ngOnInit() {
    this.route
      .paramMap
      .pipe(map(params => params.get('id') || 'None'))
      .subscribe((id: string) => {
        console.log(id);
        this.getDetail(id);
      });
  }

  getDetail(id: string) {
    this.voteService.getDetail(id)
      .subscribe((data) => {
        this.detail = data;
      }, ({ error = { msg: '加载失败，请稍后尝试' } }) => {
        const msg = error.msg;
        this.srv.show(msg, 2000, 'weui-icon-warn');
        console.log(error);
      });
  }

}

