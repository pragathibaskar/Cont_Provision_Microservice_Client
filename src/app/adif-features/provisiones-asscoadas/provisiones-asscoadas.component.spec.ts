import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvisionesAsscoadasComponent } from './provisiones-asscoadas.component';

describe('ProvisionesAsscoadasComponent', () => {
  let component: ProvisionesAsscoadasComponent;
  let fixture: ComponentFixture<ProvisionesAsscoadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvisionesAsscoadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvisionesAsscoadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
