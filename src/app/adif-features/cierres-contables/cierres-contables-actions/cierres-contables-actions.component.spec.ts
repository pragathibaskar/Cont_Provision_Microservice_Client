import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CierresContablesActionsComponent } from './cierres-contables-actions.component';

describe('CierresContablesActionsComponent', () => {
  let component: CierresContablesActionsComponent;
  let fixture: ComponentFixture<CierresContablesActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CierresContablesActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CierresContablesActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
