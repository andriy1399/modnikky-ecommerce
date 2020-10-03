import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCatalogComponent } from './admin-catalog.component';

describe('AdminCatalogComponent', () => {
  let component: AdminCatalogComponent;
  let fixture: ComponentFixture<AdminCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
