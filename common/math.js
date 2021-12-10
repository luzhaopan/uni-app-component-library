/**
 * 返回了一个在指定值之间的随机数。这个值不小于 min（有可能等于），并且小于（不等于）max
 * @param {*} min
 * @param {*} max
 * @returns min <= res < max
 */
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

// 转换金额
export const formatNum = (num) => {
  if (!num) return;
  const numStr = num.toString().split('.'); //先转为字符串，再分开整数和小数部分
  let numInt = numStr[0]; // 整数部分
  let numDec = numStr.length > 1 ? '.' + numStr[1] : '.'; // 小数部分，只有原数字存在小数点的时候，分割完长度才会大于1
  while (3 - numDec.length) numDec += '0';  //补0，只有整数的补2个，有一位小数的补1个
  let resultInt = ''; //存储整数部分处理结果
  while (numInt.length > 3) {     //当剩余整数部分长度大于3时继续处理
    resultInt = ',' + numInt.slice(-3) + resultInt;  //把后三位截出来，和处理结果拼在一起，前面加逗号
    numInt = numInt.slice(0, -3); // 剩下的部分是除去刚刚截掉的3位的部分
  }
  return numInt + resultInt + numDec; //结果是“剩余的不足3位的整数”+“处理好的整数结果”+“小数部分”
}
