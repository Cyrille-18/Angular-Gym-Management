import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerResponseModalComponentComponent } from './customer-response-modal-component.component';

describe('CustomerResponseModalComponentComponent', () => {
  let component: CustomerResponseModalComponentComponent;
  let fixture: ComponentFixture<CustomerResponseModalComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerResponseModalComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerResponseModalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
