import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarsLayoutComponent } from './avatars-layout.component';

describe('AvatarsLayoutComponent', () => {
  let component: AvatarsLayoutComponent;
  let fixture: ComponentFixture<AvatarsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvatarsLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
