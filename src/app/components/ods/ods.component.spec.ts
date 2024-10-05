import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ODSComponent } from './ods.component';

describe('ODSComponent', () => {
  let component: ODSComponent;
  let fixture: ComponentFixture<ODSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ODSComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ODSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
