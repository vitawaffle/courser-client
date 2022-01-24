import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarGalleryImageComponent } from './avatar-gallery-image.component';

describe('AvatarGalleryImageComponent', () => {
  let component: AvatarGalleryImageComponent;
  let fixture: ComponentFixture<AvatarGalleryImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvatarGalleryImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarGalleryImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
