import { ProvisionesAsscoadasModule } from './provisiones-asscoadas.module';

describe('ProvisionesAsscoadasModule', () => {
  let provisionesAsscoadasModule: ProvisionesAsscoadasModule;

  beforeEach(() => {
    provisionesAsscoadasModule = new ProvisionesAsscoadasModule();
  });

  it('should create an instance', () => {
    expect(provisionesAsscoadasModule).toBeTruthy();
  });
});
