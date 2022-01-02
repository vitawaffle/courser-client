import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailConfirmationAlertComponent } from './email-confirmation-alert.component';

describe('EmailConfirmationAlertComponent', () => {
  let component: EmailConfirmationAlertComponent;
  let fixture: ComponentFixture<EmailConfirmationAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailConfirmationAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailConfirmationAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
