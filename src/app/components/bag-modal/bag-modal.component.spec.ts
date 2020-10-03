import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BagModalComponent } from './bag-modal.component';

describe('BagModalComponent', () => {
  let component: BagModalComponent;
  let fixture: ComponentFixture<BagModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BagModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BagModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
