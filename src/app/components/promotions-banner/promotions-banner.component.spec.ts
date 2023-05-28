import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionsBannerComponent } from './promotions-banner.component';

describe('PromotionsBannerComponent', () => {
  let component: PromotionsBannerComponent;
  let fixture: ComponentFixture<PromotionsBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionsBannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromotionsBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
