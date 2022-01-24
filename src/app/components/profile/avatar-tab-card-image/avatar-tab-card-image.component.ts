import { Component } from '@angular/core';

@Component({
  selector: 'app-avatar-tab-card-image',
  templateUrl: './avatar-tab-card-image.component.html',
  styleUrls: ['./avatar-tab-card-image.component.scss']
})
export class AvatarTabCardImageComponent {

  currentAvatarUrl = '/avatars/me/current';

  isCapShown = false;

  handleImageLoadError() {
    this.isCapShown = true;
  }

}
