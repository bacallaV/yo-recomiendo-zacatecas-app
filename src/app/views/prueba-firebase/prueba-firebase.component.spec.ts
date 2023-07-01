import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaFirebaseComponent } from './prueba-firebase.component';

describe('PruebaFirebaseComponent', () => {
  let component: PruebaFirebaseComponent;
  let fixture: ComponentFixture<PruebaFirebaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PruebaFirebaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PruebaFirebaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
