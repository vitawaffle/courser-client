import { Component } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AvatarService } from 'src/app/services/avatar.service';

@Component({
  selector: 'app-avatar-form',
  templateUrl: './avatar-form.component.html',
  styleUrls: ['./avatar-form.component.scss']
})
export class AvatarFormComponent {

  avatarFile = new File([], '');

  isLoading = false;

  constructor(private avatarService: AvatarService) { }

  get isSubmitDisabled() {
    return this.avatarFile.name === '';
  }

  handleAvatarFileChange(event: any) {
    this.avatarFile = event.target.files[0];
  }

  handleFormSubmit(): void {
    this.isLoading = true;

    this.avatarService.storeAvatar(this.avatarFile)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(() => {});
  }

}
