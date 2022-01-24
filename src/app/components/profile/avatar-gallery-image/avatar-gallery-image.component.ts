import { Component, Input, Output, EventEmitter } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AvatarDTO } from 'src/app/dto/avatar.dto';
import { SERVER_ADDRESS } from 'src/app/config/app.config';
import { AvatarService } from 'src/app/services/avatar.service';

@Component({
  selector: 'app-avatar-gallery-image',
  templateUrl: './avatar-gallery-image.component.html',
  styleUrls: ['./avatar-gallery-image.component.scss']
})
export class AvatarGalleryImageComponent {

  isDeleteLoading = false;

  @Input()
  avatar: AvatarDTO = {
    file: {
      name: ''
    }
  };

  @Output()
  deleted = new EventEmitter<AvatarDTO>();

  constructor(private avatarService: AvatarService) { }

  get src() {
    return SERVER_ADDRESS + '/avatars/' + this.avatar.id;
  }

  handleDeleteButtonClick() {
    this.isDeleteLoading = true;
    this.avatarService.deleteAvatarById(this.avatar.id!!)
      .pipe(finalize(() => {
        this.isDeleteLoading = false;
        this.deleted.emit(this.avatar);
      }))
      .subscribe(() => {});
  }

}
