import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionmodalComponent } from './subscriptionmodal.component';

describe('SubscriptionmodalComponent', () => {
  let component: SubscriptionmodalComponent;
  let fixture: ComponentFixture<SubscriptionmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionmodalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
