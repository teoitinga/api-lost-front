import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodasComprasComponent } from './todas-compras.component';

describe('TodasComprasComponent', () => {
  let component: TodasComprasComponent;
  let fixture: ComponentFixture<TodasComprasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodasComprasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodasComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
