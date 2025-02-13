import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackmodalComponent } from './packmodal.component';

describe('PackmodalComponent', () => {
  let component: PackmodalComponent;
  let fixture: ComponentFixture<PackmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackmodalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
