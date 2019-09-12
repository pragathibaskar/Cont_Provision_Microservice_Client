import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvisionesAsscoadasHomeComponent } from './provisiones-asscoadas-home.component';

describe('ProvisionesAsscoadasHomeComponent', () => {
  let component: ProvisionesAsscoadasHomeComponent;
  let fixture: ComponentFixture<ProvisionesAsscoadasHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvisionesAsscoadasHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvisionesAsscoadasHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
