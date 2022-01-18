import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarTabCardComponent } from './avatar-tab-card.component';

describe('AvatarTabCardComponent', () => {
  let component: AvatarTabCardComponent;
  let fixture: ComponentFixture<AvatarTabCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvatarTabCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarTabCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
