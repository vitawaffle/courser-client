import { Component, OnInit } from '@angular/core';
import { AvatarService } from 'src/app/services/avatar.service';
import { AvatarDTO } from 'src/app/dto/avatar.dto';

@Component({
  selector: 'app-avatar-gallery',
  templateUrl: './avatar-gallery.component.html',
  styleUrls: ['./avatar-gallery.component.scss']
})
export class AvatarGalleryComponent implements OnInit {

  avatars: AvatarDTO[] = [];

  constructor(private avatarService: AvatarService) { }

  loadAvatars() {
    this.avatarService.getAllAvatars()
      .subscribe(avatars => this.avatars = avatars);
  }

  ngOnInit() {
    this.loadAvatars();
  }

  handleDeleteEvent(avatar: AvatarDTO) {
    this.avatars = this.avatars.filter(item => item.id !== avatar.id);
  }

}
