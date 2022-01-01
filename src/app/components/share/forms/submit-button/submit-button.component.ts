import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.scss']
})
export class SubmitButtonComponent {

  @Input()
  isLoading: boolean = false;

  @Input()
  isBlock: boolean = false;

  @Input()
  isDisabled: boolean = false;

}