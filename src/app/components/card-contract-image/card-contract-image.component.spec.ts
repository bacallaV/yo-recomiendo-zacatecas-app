import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardContractImageComponent } from './card-contract-image.component';

describe('CardContractImageComponent', () => {
  let component: CardContractImageComponent;
  let fixture: ComponentFixture<CardContractImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardContractImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardContractImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
