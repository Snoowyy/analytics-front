import { DictionaryPipe } from './dictionary.pipe';

describe('DictionaryPipe', () => {
  it('create an instance', () => {
    const pipe = new DictionaryPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return null', () => {
    const pipe = new DictionaryPipe();
    expect(pipe.transform(null)).toEqual(null);
    expect(pipe.transform(undefined)).toEqual(null);
  });

  it('should return the translation of periodicity', () => {
    const pipe = new DictionaryPipe();
    expect(pipe.transform('daily')).toEqual('diario');
    expect(pipe.transform('weekly')).toEqual('semanal');
    expect(pipe.transform('monthly')).toEqual('mensual');
    expect(pipe.transform('yearly')).toEqual('anual');
  });
});
