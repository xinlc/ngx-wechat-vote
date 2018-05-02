
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

let nextId = 1;

export class UserServiceConfig {
  userName = '';
}

@Injectable()
export class UserService {
  id = nextId++;
  private _userName = '';
  private _openId = '';

  constructor(@Optional() config: UserServiceConfig) {
    if (config) { this._userName = config.userName; }
  }

  get userName() {
    return this._userName;
  }

  get openId() {
    return this._openId;
  }

  setOpenId(id: string) {
    this._openId = id;
  }

  getUser(): Observable<any> {
    return of({
      userName: this._userName
    });
  }
}
