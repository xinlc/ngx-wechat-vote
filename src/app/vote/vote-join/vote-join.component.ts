import { Component, OnInit } from '@angular/core';
import { UploaderOptions, FileItem, Uploader, ToastService } from 'ngx-weui';
import { Observable } from 'rxjs/Observable';

import { VoteService } from '../vote.service';
import { Voter } from '../voter';


@Component({
  selector: 'app-vote-join',
  templateUrl: './vote-join.component.html',
  styleUrls: ['./vote-join.component.less']
})
export class VoteJoinComponent implements OnInit {
  me: Voter;
  name: string;
  mobile: string;
  img: any;
  imgShow = false;
  imgLimit = 3;

  uploader: Uploader = new Uploader(<UploaderOptions>{
    limit: this.imgLimit,
    uploadTransport: (item: FileItem) => {
        return Observable.create(observer => {
            setTimeout(() => {
              item.isUploading = true;
                observer.next(true);
                observer.complete();
            }, 1000 * 3);
        });
    },
    onFinished: (...args) => {
      console.log(args);
    },
    onUploadError: (...args) => {
      console.log(args);
    }
  });

  constructor(
    private voteService: VoteService,
    private srv: ToastService
  ) { }

  ngOnInit() {
    // const phoneRe = /^1[3|4|5|7|8][0-9]\d{8}$/;
    this.getMe();
  }

  getMe() {
    this.voteService.getMe()
      .subscribe((data) => {
        this.me = data;
      });
  }

  onGallery(item: any) {
    this.img = [{ file: item._file, item: item }];
    this.imgShow = true;
  }

  onDel(item: any) {
    console.log(item);
    this.uploader.removeFromQueue(item.item);
  }

  onSave() {
    // this.uploader.uploadAll();
    this.voteService.enroll(this.name, this.mobile, this.uploader.queue)
      .subscribe((res) => {
        console.log('res', res);
        this.srv.show('报名成功，等待审核');
        this.getMe();
      }, ({ error = { msg: '报名失败，请稍后尝试' } }) => {
        const msg = error.msg;
        this.srv.show(msg, 2000, 'weui-icon-warn');
        console.log(error);
      });
  }
}
