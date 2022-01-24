import { Component } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AvatarService } from 'src/app/services/avatar.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-delete-current-avatar-button',
  templateUrl: './delete-current-avatar-button.component.html',
  styleUrls: ['./delete-current-avatar-button.component.scss']
})
export class DeleteCurrentAvatarButtonComponent {

  isLoading = false;

  constructor(private avatarService: AvatarService, private authService: AuthService) { }

  get isDisabled() {
    return false;
  }

  handleClick() {
    this.isLoading = true;
    this.avatarService.deleteCurrentAvatar()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(() => {});
  }

}
