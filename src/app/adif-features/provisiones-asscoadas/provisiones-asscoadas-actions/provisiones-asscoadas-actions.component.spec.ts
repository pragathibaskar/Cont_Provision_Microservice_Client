import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvisionesAsscoadasActionsComponent } from './provisiones-asscoadas-actions.component';

describe('ProvisionesAsscoadasActionsComponent', () => {
  let component: ProvisionesAsscoadasActionsComponent;
  let fixture: ComponentFixture<ProvisionesAsscoadasActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvisionesAsscoadasActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvisionesAsscoadasActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
