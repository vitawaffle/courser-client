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

  loadAvatars(): void {
    this.avatarService.getAllAvatars()
      .subscribe((avatars: AvatarDTO[]) => this.avatars = avatars);
  }

  ngOnInit(): void {
    this.loadAvatars();
  }

}
