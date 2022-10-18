/** 生成随机图表id */
function generateRandomKey(prefix) {
  if(prefix == null) prefix = 'chart';
  
  const userAgent = window.navigator.userAgent.replace(/[^a-zA-Z0-9]/g, '').split('');
  let mid = '';
  for(let i = 0; i < 12; i++) mid += userAgent[Math.round(Math.random() * (userAgent.length - 1))];
  const time = new Date().getTime();
  
  return prefix + '_' + mid + '_' + time;
}

/**
 * 深度克隆数据,包括对象，数组，map
 * 
 * @param {*} obj 对象，数组，map
 */
function deepCopy(obj) {
  if(!isObject(obj) && !isMap(obj)) return obj;
  
  let cloneObj;
  if(isMap(obj)) {
    cloneObj = new Map();
    for(const key of obj.keys()) {
      const value = obj.get(key);
      if(isMap(value) || isObject(value) || Array.isArray(obj)) {
          const copyVal = deepCopy(value);
          cloneObj.set(key, copyVal);
      }
      else {
        cloneObj.set(key, value);
      }
    }
  }
  else if(typeof obj === 'function') {
    cloneObj = obj;
  }
  else {
    cloneObj = Array.isArray(obj) ? [] : {};
    if(obj instanceof HTMLElement) {
      cloneObj = obj.cloneNode(true);
    }
    else {
      for(const key in obj) {
        if(Object.prototype.hasOwnProperty.call(obj, key)) cloneObj[key] = isMap(obj[key]) || isObject(obj[key]) ? deepCopy(obj[key]) : obj[key];
      }
    }
  }
  return cloneObj;
}

/**
 * 判断参数是否是Object类型
 * 
 * @param {*} o
 */
function isObject(o) {
  return (!isMap(o) && (typeof o === 'object' || typeof o === 'function') && o !== null);
}

/**
 * 判断参数是否是Map类型
 * 
 * @param {*} obj
 */
function isMap(obj) {
  return obj instanceof Map;
}

/**
 * 替换temp中的${xxx}为指定内容 ,temp:字符串，这里指html代码，dataarry：一个对象{"xxx":"替换的内容"}
 * 例：luckysheet.replaceHtml("${image}",{"image":"abc","jskdjslf":"abc"})   ==>  abc
 */
function replaceHtml(temp, dataarry) {
  return temp.replace(/\$\{([\w]+)\}/g, (s1, s2) => {
    const s = dataarry[s2];
    return typeof s !== 'undefined' ? s : s1;
  });
}

export {
  isMap,
  isObject,
  deepCopy,
  generateRandomKey,
  replaceHtml
};
