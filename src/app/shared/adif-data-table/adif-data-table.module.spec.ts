import { AdifDataTableModule } from './adif-data-table.module';

describe('AdifDataTableModule', () => {
  let adifDataTableModule: AdifDataTableModule;

  beforeEach(() => {
    adifDataTableModule = new AdifDataTableModule();
  });

  it('should create an instance', () => {
    expect(adifDataTableModule).toBeTruthy();
  });
});
