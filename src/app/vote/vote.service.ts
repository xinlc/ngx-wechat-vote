
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, } from 'rxjs/Observable';
import { of, } from 'rxjs/observable/of';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { UserService } from '../core/data/user.service';

import { FileItem } from 'ngx-weui';

import { Voter, Activity } from './voter';
import { HttpErrorHandler, HandleError } from '../core/http-error-handler.service';
import Network from '../core/network';
import Util from '../core/util';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

declare class OSS {
  constructor(someParam?: string);
  static Wrapper: (params: any) => void;
}

@Injectable()
export class VoteService {
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
    private userService: UserService,
    ) {
    this.handleError = httpErrorHandler.createHandleError('VoteService');
  }

  getVoteList(page: number, keyword: string): Observable<Voter[]> {
    if (page === 3) {
      return of([]);
    }
    const url = `${Network.VOTE_URL}`;
    const options = {
      params: new HttpParams()
        .set('name', `^${keyword}`)
        // .set('pn', `${page}`)
        // .set('ps', '12')
    };
    return this.http.get<Voter[]>(url, options)
      .pipe(
        catchError(this.handleError('getVoteList', []))
      );
  }

  getActivityInfo(): Observable<Activity> {
    const url = 'api/activity';
    return this.http.get<Activity>(url)
      .pipe(
        catchError(this.handleError('getActivityInfo', {} as Activity))
      );
  }

  vote(id): Observable<{}> {
    const url = `${Network.VOTE_URL}/${id}`;
    return this.http.post(url, {}, httpOptions);
  }

  enroll(name: string, mobile: string, photos: Array<FileItem>): Observable<{}> {
    return this.uploadImgs(photos)
      .pipe(mergeMap((obj: any) => {
        const urls = obj.value;
        const body = {
          openId: this.userService.openId,
          name,
          phone: mobile,
          photos: urls
        };
        const url = `${Network.VOTE_URL}/enroll`;
        return this.http.post(url, body, httpOptions);
      }));
  }


  uploadImgs(files: Array<FileItem>): Observable<{}> {
    const userId = '1';
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': 'xxx',
      })
    };
    const fileTypes = {
      'image/png': 'png',
      'image/jpeg': 'jpg',
    };

    // TODO: sts 自己实现
    const url = Network.ALI_OSS_STSTOKEN.replace('$userid', userId);
    return this.http.get(url, options)
      .pipe(mergeMap((token: any) => {
        const client = new OSS.Wrapper({
          endpoint: Network.ALI_OSS_ENDPOINT,
          accessKeyId: token.AccessKeyId,
          accessKeySecret: token.AccessKeySecret,
          stsToken: token.SecurityToken,
          bucket: Network.ALI_OSS_BUCKETNAME,
          secure: true,
        });
        return of(client);
      }))
      .pipe(mergeMap( async (client: any) => {
        const urls = [];
        for (const fileItem of files) {
          const file = fileItem._file;
          const dotType = fileTypes[file.type];
          const storeAs = `${userId}/${Util.generateUUID()}.${dotType}`;

          const result = await client.multipartUpload(storeAs, file);
          console.log('upload img', result);
          urls.push(result.url);
        }

        return of(urls);
      }));
  }

  getRankingList(page: number): Observable<Voter[]> {
    const url = `${Network.VOTE_URL}`;
    const options = {
      params: new HttpParams()
        // .set('pn', `${page}`)
        // .set('ps', '20')
    };
    return this.http.get<Voter[]>(url, options)
      .pipe(
        catchError(this.handleError('getRankingList', []))
      );
  }

  getMe(): Observable<Voter> {
    const openId = this.userService.openId;
    const url = `${Network.VOTE_URL}/bevotedetail/${openId}`;
    return this.http.get<Voter>(url)
      .pipe(
        catchError(this.handleError('getMe', {} as Voter))
      );
  }

  getDetail(id: string): Observable<Voter> {
    const url = `${Network.VOTE_URL}/${id}`;
    return this.http.get<Voter>(url);
  }

  getNeedapprovelist(page: number): Observable<Voter[]> {
    const url = `${Network.VOTE_URL}/needapprovelist`;
    const options = {
      params: new HttpParams()
        .set('pn', `${page}`)
        .set('ps', '10')
    };
    return this.http.get<Voter[]>(url, options)
      .pipe(
        catchError(this.handleError('getNeedapprovelist', []))
      );
  }

  pass(id: string): Observable<{}> {
    const url = `${Network.VOTE_URL}/accept`;

    const options = {
      params: new HttpParams()
        .set('ids', id)
    };
    return this.http.put(url, {}, options);
  }

  getAccess(): Observable<{}> {
    const url = `api/voters/1`;
    return this.http.get(url)
      .pipe(
        catchError(this.handleError('getAccess', {}))
      );
  }
}
