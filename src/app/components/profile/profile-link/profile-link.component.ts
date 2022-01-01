import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: '[app-profile-link]',
  templateUrl: './profile-link.component.html',
  styleUrls: ['./profile-link.component.scss']
})
export class ProfileLinkComponent {

  @Input()
  url: string = '';

  constructor(private router: Router) { }

  get isActive(): boolean {
    return this.router.url.startsWith(this.url);
  }

}
