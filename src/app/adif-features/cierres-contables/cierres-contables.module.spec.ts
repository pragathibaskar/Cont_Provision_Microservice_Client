import { CierresContablesModule } from './cierres-contables.module';

describe('CierresContablesModule', () => {
  let cierresContablesModule: CierresContablesModule;

  beforeEach(() => {
    cierresContablesModule = new CierresContablesModule();
  });

  it('should create an instance', () => {
    expect(cierresContablesModule).toBeTruthy();
  });
});
