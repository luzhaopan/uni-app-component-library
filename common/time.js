// import dayjs from 'dayjs';

// dayjs.locale('zh-cn');

// /*
// * 时间格式化
// */
// export const moments = (value) => {
//   return dayjs(value).format('MM/DD');
// }


// /*
//   年份加--月
// */

// export const momentAddMonth = (value,step) => {
//   var m = dayjs(value); // the day before DST in the US
//   m.month(); //
//   m.add(step, 'month').month();
//   m.locale('zh-cn');
//   return dayjs(m).format('MM/DD');
// }

// /*
//     时间减--月
// */
// export const momentSubtractMonth = (value, month) => {
//   var m = dayjs(value); // the day before DST in the US
//   m.month(); // 5
//   m.subtract(month, 'month').month();
//   m.locale('zh-cn');
//   return dayjs(m).format('MM/DD');
// }

// /*
//     天数加--天
// */
// export const momentAddDay = (value, step) => {

//   var m = dayjs(value); // the day before DST in the US
//   m.day(); // 5
//   m.add(step, 'day').day();
//   m.locale('zh-cn');
//   return dayjs(m).format('MM-DD');
// }

// /*
//     天数减--天
// */
// export const momentSubtractDay = (value, step) => {

//   var m = dayjs(value); // the day before DST in the US
//   m.day(); // 5
//   m.subtract(step, 'day').day();
//   m.locale('zh-cn');
//   return dayjs(m).format('MM/DD');
// }

// 获取当前时间
export const getCurrentTime = () => {
  let date = new Date();
  let hours = date.getHours();   //获取时钟
  let minutes = date.getMinutes();   //获取分钟
  // let seconds=odate.getSeconds();  //获取秒
  if (hours < 10) {
    hours = '0' + hours
  }
  if (minutes < 10) {
    minutes = '0' + minutes
  }
  return hours + ':' + minutes
}
