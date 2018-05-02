import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from './core/auth.service';
import { UserService } from './core/data/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.initAuth();
  }

  initAuth() {
    this.route
      .queryParamMap
      .pipe(map(params => params.get('o') || 'None'))
      .subscribe((id: string) => {
        this.authService.setToken(id);
        this.userService.setOpenId(id);
      });
  }

}
