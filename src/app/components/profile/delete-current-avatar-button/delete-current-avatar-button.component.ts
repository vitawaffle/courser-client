import { Component } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AvatarService } from 'src/app/services/avatar.service';

@Component({
  selector: 'app-delete-current-avatar-button',
  templateUrl: './delete-current-avatar-button.component.html',
  styleUrls: ['./delete-current-avatar-button.component.scss']
})
export class DeleteCurrentAvatarButtonComponent {

  isLoading: boolean = false;

  constructor(private avatarService: AvatarService) { }

  handleClick(): void {
    this.isLoading = true;
    this.avatarService.deleteCurrentAvatar()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(() => {});
  }

}
