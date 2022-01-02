import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-email-confirmation-alert',
  templateUrl: './email-confirmation-alert.component.html',
  styleUrls: ['./email-confirmation-alert.component.scss']
})
export class EmailConfirmationAlertComponent implements OnInit {

  isCanBeResendLoading: boolean = false;

  canBeResend?: Date;

  isTimerActive: boolean = false;

  timeLeft?: number;

  isLoading: boolean = false;

  constructor(private emailService: EmailService) { }

  get isResendButtonDisabled(): boolean {
    return this.isCanBeResendLoading || this.isLoading || this.isTimerActive;
  }

  ngOnInit(): void {
    this.init();
  }

  loadCanBeResend(onFinal?: () => void): void {
    this.isCanBeResendLoading = true;
    this.emailService.getCanBeResend().pipe(finalize(() => {
      if (onFinal) {
        onFinal();
      }
    })).subscribe(canBeResend => {
      this.canBeResend = canBeResend;
      this.isCanBeResendLoading = false;
    });
  }

  startTimer(canBeResend: Date): void {
    this.isTimerActive = true;
    const interval = setInterval(() => {
      this.timeLeft = Math.trunc((canBeResend.getTime() - Date.now()) / 1000);
      if (this.timeLeft <= 0) {
        this.timeLeft = undefined;
        this.isTimerActive = false;
        clearInterval(interval);
      }
    }, 1000);
  }

  init(): void {
    this.loadCanBeResend(() => {
      if (this.canBeResend) {
        this.startTimer(this.canBeResend);
      }
    });
  }

  resendConfirmationEmail(): void {
    this.isLoading = true;
    this.emailService.resendConfirmationEmail({
      onFinal: () => {
        this.isLoading = false;
        this.init();
      },
    });
  }

}
