import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdsDetailComponent } from './ods-detail.component';

describe('OdsDetailComponent', () => {
  let component: OdsDetailComponent;
  let fixture: ComponentFixture<OdsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OdsDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OdsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
