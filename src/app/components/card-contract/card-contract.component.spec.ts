import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardContractComponent } from './card-contract.component';

describe('CardContractComponent', () => {
  let component: CardContractComponent;
  let fixture: ComponentFixture<CardContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardContractComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
