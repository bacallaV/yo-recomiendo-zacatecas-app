import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesInDetailComponent } from './images-in-detail.component';

describe('ImagesInDetailComponent', () => {
  let component: ImagesInDetailComponent;
  let fixture: ComponentFixture<ImagesInDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagesInDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagesInDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
