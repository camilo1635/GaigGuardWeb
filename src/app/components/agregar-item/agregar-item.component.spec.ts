import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarItemComponent } from './agregar-item.component';

describe('AgregarItemComponent', () => {
  let component: AgregarItemComponent;
  let fixture: ComponentFixture<AgregarItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
