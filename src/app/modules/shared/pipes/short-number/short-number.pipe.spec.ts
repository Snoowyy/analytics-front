import { ShortNumberPipe } from './short-number.pipe';

describe('ShortNumberPipe', () => {
  let pipe: ShortNumberPipe;

  beforeEach(() => {
    pipe = new ShortNumberPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('Bad inputs', () => {
    it('should return null', () => {
      expect(pipe.transform(undefined)).toEqual(null);
    });

    it('should return 0', () => {
      expect(pipe.transform(0)).toEqual(0);
      expect(pipe.transform(null)).toEqual(0);
    });
  });

  describe('calculations', () => {
    it('should return the same number received', () => {
      expect(pipe.transform(1)).toEqual('1');
      expect(pipe.transform(999)).toEqual('999');
      expect(pipe.transform(-900)).toEqual('-900');
    });

    it('should return the number with format K', () => {
      expect(pipe.transform(1000)).toEqual('1K');
      expect(pipe.transform(50000)).toEqual('50K');
      expect(pipe.transform(-999000)).toEqual('-999K');
    });

    it('should return the number with format M', () => {
      expect(pipe.transform(1000000)).toEqual('1M');
      expect(pipe.transform(500000000)).toEqual('500M');
      expect(pipe.transform(-2000000)).toEqual('-2M');
    });

    it('should return the number with format B', () => {
      expect(pipe.transform(5000000000)).toEqual('5B');
      expect(pipe.transform(500000000000)).toEqual('500B');
      expect(pipe.transform(-1000000000)).toEqual('-1B');
    });

    it('should return the number with format T', () => {
      expect(pipe.transform(6000000000000)).toEqual('6T');
      expect(pipe.transform(900000000000000)).toEqual('900T');
      expect(pipe.transform(-1000000000000)).toEqual('-1T');
    });

    it('should return three decimals', () => {
      expect(pipe.transform(12452)).toEqual('12.452K');
      expect(pipe.transform(12452000)).toEqual('12.452M');
      expect(pipe.transform(12452000000)).toEqual('12.452B');
      expect(pipe.transform(12452000000000)).toEqual('12.452T');
    });
  });
});
