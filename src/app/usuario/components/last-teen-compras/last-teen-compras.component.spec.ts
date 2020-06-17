import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastTeenComprasComponent } from './last-teen-compras.component';

describe('LastTeenComprasComponent', () => {
  let component: LastTeenComprasComponent;
  let fixture: ComponentFixture<LastTeenComprasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastTeenComprasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastTeenComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
