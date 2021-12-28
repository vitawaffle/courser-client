import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private router: Router, private authService: AuthService) { }

  get isAuthenticated() {
    return this.authService.isAuthenticated;
  }

  logout() {
    this.authService.logout(() => this.router.navigateByUrl("/home"));
  }

}
