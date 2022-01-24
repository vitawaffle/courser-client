import { Component, Input } from '@angular/core';
import { AvatarDTO } from 'src/app/dto/avatar.dto';
import { SERVER_ADDRESS } from 'src/app/config/app.config';
import { AvatarService } from 'src/app/services/avatar.service';

@Component({
  selector: 'app-avatar-gallery-image',
  templateUrl: './avatar-gallery-image.component.html',
  styleUrls: ['./avatar-gallery-image.component.scss']
})
export class AvatarGalleryImageComponent {

  @Input()
  avatar: AvatarDTO = {
    file: {
      name: ''
    }
  };

  constructor(private avatarService: AvatarService) { }

  get src() {
    return SERVER_ADDRESS + '/avatars/' + this.avatar.id;
  }

  handleDeleteButtonClick() {
  }

}
