import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomermodalComponent } from './customermodal.component';

describe('CustomermodalComponent', () => {
  let component: CustomermodalComponent;
  let fixture: ComponentFixture<CustomermodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomermodalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomermodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
