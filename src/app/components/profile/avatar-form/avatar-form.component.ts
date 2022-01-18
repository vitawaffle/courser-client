import { Component } from '@angular/core';
import { AvatarService } from 'src/app/services/avatar.service';

@Component({
  selector: 'app-avatar-form',
  templateUrl: './avatar-form.component.html',
  styleUrls: ['./avatar-form.component.scss']
})
export class AvatarFormComponent {

  avatarFile: File = new File([], '');

  isLoading: boolean = false;

  constructor(private avatarService: AvatarService) { }

  get isSubmitDisabled(): boolean {
    return this.avatarFile.name === '';
  }

  handleAvatarFileChange(event: any): void {
    this.avatarFile = event.target.files[0];
  }

  handleFormSubmit(): void {
    this.isLoading = true;
    this.avatarService.storeAvatar(this.avatarFile, {
      onFinal: () => this.isLoading = false,
    });
  }

}
