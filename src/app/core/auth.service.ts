
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  private token: string;

  getAuthorizationToken() {
    return this.token;
  }

  setToken(token: string) {
    this.token = token;
  }
}
