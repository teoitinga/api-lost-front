import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitoComprasComponent } from './debito-compras.component';

describe('DebitoComprasComponent', () => {
  let component: DebitoComprasComponent;
  let fixture: ComponentFixture<DebitoComprasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebitoComprasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebitoComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
