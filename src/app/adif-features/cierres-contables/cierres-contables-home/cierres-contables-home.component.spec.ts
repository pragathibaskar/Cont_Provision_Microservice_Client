import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CierresContablesHomeComponent } from './cierres-contables-home.component';

describe('CierresContablesHomeComponent', () => {
  let component: CierresContablesHomeComponent;
  let fixture: ComponentFixture<CierresContablesHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CierresContablesHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CierresContablesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
