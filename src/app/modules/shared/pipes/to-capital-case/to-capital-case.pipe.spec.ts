import { ToCapitalCasePipe } from './to-capital-case.pipe';

describe('ToCapitalCasePipe', () => {
  it('create an instance', () => {
    const pipe = new ToCapitalCasePipe();
    expect(pipe).toBeTruthy();
  });

  it('should return null', () => {
    const pipe = new ToCapitalCasePipe();
    expect(pipe.transform(null)).toEqual(null);
    expect(pipe.transform(undefined)).toEqual(null);
  });

  it('should return Capitalcase string', () => {
    const expected = 'Products ramo';
    const pipe = new ToCapitalCasePipe();
    expect(pipe.transform('PRODUCTS RAMO')).toEqual(expected);
    expect(pipe.transform('products ramo')).toEqual(expected);
  });
});
