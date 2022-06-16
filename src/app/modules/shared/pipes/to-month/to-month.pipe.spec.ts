import { ToMonthPipe } from './to-month.pipe';

describe('ToMonthPipe', () => {
  let pipe: ToMonthPipe;

  beforeEach(() => {
    pipe = new ToMonthPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return null', () => {
    expect(pipe.transform(null)).toEqual(null);
    expect(pipe.transform('hola mundo')).toEqual(null);
  });
});
