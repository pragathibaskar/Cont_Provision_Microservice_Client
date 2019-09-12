import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CierresContablesComponent } from './cierres-contables.component';

describe('CierresContablesComponent', () => {
  let component: CierresContablesComponent;
  let fixture: ComponentFixture<CierresContablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CierresContablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CierresContablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
