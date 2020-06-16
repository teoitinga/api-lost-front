import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuitadasComprasComponent } from './quitadas-compras.component';

describe('QuitadasComprasComponent', () => {
  let component: QuitadasComprasComponent;
  let fixture: ComponentFixture<QuitadasComprasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuitadasComprasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuitadasComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
