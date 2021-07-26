/**
 * 移除重复项
 * @param arr
 * @param keys
 */
export const removeDuplicates = <T>(arr: T[], keys?: keyof T | (keyof T)[]): T[] => {
  const rtn: T[] = [];
  const key = keys ? (Array.isArray(keys) ? keys : [keys]) : null;
  arr.forEach(v => {
    const b = rtn.find(d => {
      if (key) {
        return key.every(k => v[k] === d[k]);
      } else {
        return v === d;
      }
    });
    if (!b) {
      rtn.push(v);
    }
  });

  return rtn;
};
/**
 * 根据多个关键字排序数组
 * @param arr 要排序的数组
 * @param keys 关键字
 * @param isDes 是否降序排列, 默认为升序
 */
export const sortArrayByKeys = <T>(arr: T[], keys: (keyof T)[], isDes: boolean = false): T[] => {
  if (!arr || !arr.length || arr.length < 2) return arr;
  arr = [...arr];
  function sort(key: keyof T) {
    const lens = arr.length;
    const bol = typeof arr[0][key] === 'string' && !isNaN((arr[0][key] as any) - 0);
    for (let i = 0; i < lens - 1; i++) {
      for (let j = 0; j < lens - 1 - i; j++) {
        let jj: any = arr[j][key];
        let jj1: any = arr[j + 1][key];
        if (bol) {
          jj = (jj as any) - 0;
          jj1 = (jj1 as any) - 0;
        }
        if ((isDes && jj < jj1) || (!isDes && jj > jj1)) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
  }

  if (typeof keys === 'string') {
    keys = [keys];
  }
  const keyLens = keys.length;
  for (let i = 0; i < keyLens; i++) {
    sort(keys[i]);
  }
  return arr;
};
/**
 * 裁剪期数中的年份
 * @param period
 */
export const trimPeriod = (period: number | string): number => {
  period = '' + period;
  if (period.length < 9) return parseInt(period);
  const testDate = new Date(period.slice(0, 8).replace(/^(\d{4})(\d{2})(\d{2})/, '$1/$2/$3'));
  if (Object.prototype.toString.call(testDate) === '[object Date]') {
    return parseInt(period.slice(4));
  }
  return parseInt(period);
};
