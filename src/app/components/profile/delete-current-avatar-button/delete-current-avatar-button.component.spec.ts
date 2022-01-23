import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCurrentAvatarButtonComponent } from './delete-current-avatar-button.component';

describe('DeleteCurrentAvatarButtonComponent', () => {
  let component: DeleteCurrentAvatarButtonComponent;
  let fixture: ComponentFixture<DeleteCurrentAvatarButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCurrentAvatarButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCurrentAvatarButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
