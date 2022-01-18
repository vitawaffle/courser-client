import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarTabCardImageComponent } from './avatar-tab-card-image.component';

describe('AvatarTabCardImageComponent', () => {
  let component: AvatarTabCardImageComponent;
  let fixture: ComponentFixture<AvatarTabCardImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvatarTabCardImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarTabCardImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
