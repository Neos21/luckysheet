import { isRealNum } from '../global/validate';

/** 判断obj是否为一个整数 */
function isInteger(obj) {
  return Math.floor(obj) === obj;
}

/**
 * 将一个浮点数转成整数，返回整数和倍数。如 3.14 >> 314，倍数是 100
 * 
 * @param {number} floatNum 小数
 * @return {object} {times:100, num: 314}
 */
function toInteger(floatNum) {
  const ret = { times: 1, num: 0 };
  
  if(isInteger(floatNum)) {
    ret.num = floatNum;
    return ret;
  }
  
  const strfi  = floatNum + '';
  const dotPos = strfi.indexOf('.');
  const len    = strfi.substr(dotPos + 1).length;
  const times  = Math.pow(10, len);
  const intNum = parseInt(floatNum * times + 0.5, 10);
  
  ret.times = times;
  ret.num   = intNum;
  return ret;
}

/**
 * 核心方法，实现加减乘除运算，确保不丢失精度
 * 思路：把小数放大为整数（乘），进行算术运算，再缩小为小数（除）
 * 
 * @param {number} a 运算数1
 * @param {number} b 运算数2
 * @param {string} op 运算类型，有加减乘除（add/subtract/multiply/divide）
 */
function operation(a, b, op) {
  const o1     = toInteger(a);
  const o2     = toInteger(b);
  const n1     = o1.num;
  const n2     = o2.num;
  const t1     = o1.times;
  const t2     = o2.times;
  const max    = t1 > t2 ? t1 : t2;
  let   result = null;
  
  switch(op) {
    case 'add':
      if(t1 === t2) {  // 两个小数位数相同
        result = n1 + n2;
      }
      else if (t1 > t2) {  // o1 小数位 大于 o2
        result = n1 + n2 * (t1 / t2);
      }
      else {  // o1 小数位 小于 o2
        result = n1 * (t2 / t1) + n2;
      }
      return result / max;
    case 'subtract':
      if(t1 === t2) {
        result = n1 - n2;
      }
      else if(t1 > t2) {
        result = n1 - n2 * (t1 / t2);
      }
      else {
        result = n1 * (t2 / t1) - n2;
      }
      return result / max;
    case 'multiply':
      result = (n1 * n2) / (t1 * t2);
      return result;
    case 'divide':
      return result = (() => {
        const r1 = n1 / n2;
        const r2 = t2 / t1;
        return operation(r1, r2, 'multiply');
      })();
  }
}

/**
 * 做小数点的四舍五入计算
 * 
 * @param {*} num
 * @param {*} precision
 */
function fixed(num, precision) {
  if(!precision) precision = 2;
  if(!isRealNum(num)) return num;
  
  const s      = num.toFixed(precision);
  const index  = s.indexOf('.');
  const prefix = s.substring(0, index);
  let   suffix = s.substring(index + 1, s.length);
  if(suffix) {
    for(let i = suffix.length - 1; i != 0; i--) {
      // 最末位不为0，直接break;
      if(suffix.charAt(i) != '0' && i == suffix.length - 1) {
        break;
      }
      else {
        suffix = suffix.substring(0, i);
      }
    }
  }
  return Number(prefix + '.' + suffix);
}

/** Calculation +-/* Solve the problem of js accuracy */
Number.prototype.add = function(value) {
  const number = parseFloat(value);
  if(typeof number !== 'number' || Number.isNaN(number)) throw new Error('请输入数字或者数字字符串～');
  return operation(this, number, 'add');
};

Number.prototype.subtract = function(value) {
  const number = parseFloat(value);
  if(typeof number !== 'number' || Number.isNaN(number)) throw new Error('请输入数字或者数字字符串～');
  return operation(this, number, 'subtract');
};

Number.prototype.multiply = function(value) {
  const number = parseFloat(value);
  if(typeof number !== 'number' || Number.isNaN(number)) throw new Error('请输入数字或者数字字符串～');
  return operation(this, number, 'multiply');
};

Number.prototype.divide = function(value) {
  const number = parseFloat(value);
  if(typeof number !== 'number' || Number.isNaN(number)) throw new Error('请输入数字或者数字字符串～');
  return operation(this, number, 'divide');
};

Number.prototype.tofixed = function(value) {
  const precision = parseFloat(value);
  if(typeof precision !== 'number' || Number.isNaN(precision)) throw new Error('请输入数字或者数字字符串～');
  return fixed(this, precision);
};
