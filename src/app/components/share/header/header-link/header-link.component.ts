import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: '[app-header-link]',
  templateUrl: './header-link.component.html',
  styleUrls: ['./header-link.component.scss']
})
export class HeaderLinkComponent {

  @Input()
  url = '';

  constructor(private router: Router) { }

  get isActive() {
    return this.router.url.startsWith(this.url);
  }

}
