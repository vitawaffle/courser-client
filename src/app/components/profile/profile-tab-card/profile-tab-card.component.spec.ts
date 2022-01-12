import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTabCardComponent } from './profile-tab-card.component';

describe('ProfileTabCardComponent', () => {
  let component: ProfileTabCardComponent;
  let fixture: ComponentFixture<ProfileTabCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileTabCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileTabCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
