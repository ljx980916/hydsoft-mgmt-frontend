import CryptoJS from "crypto-js";
import { LOGIN_TOKEN,isTest } from '@/store/mutation-types'

export const version = '0.1';

export function timeFix () {
    const time = new Date()
    const hour = time.getHours()
    return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent () {
    const event = document.createEvent('HTMLEvents')
    event.initEvent('resize', true, true)
    event.eventType = 'message'
    window.dispatchEvent(event)
}

export function handleScrollHeader (callback) {
    let timer = 0

    let beforeScrollTop = window.pageYOffset
    callback = callback || function () {}
    window.addEventListener(
        'scroll',
        () => {
            clearTimeout(timer)
            timer = setTimeout(() => {
                let direction = 'up'
                const afterScrollTop = window.pageYOffset
                const delta = afterScrollTop - beforeScrollTop
                if (delta === 0) {
                    return false
                }
                direction = delta > 0 ? 'down' : 'up'
                callback(direction)
                beforeScrollTop = afterScrollTop
            }, 50)
        },
        false
    )
}

export function isIE () {
    const bw = window.navigator.userAgent
    const compare = (s) => bw.indexOf(s) >= 0
    const ie11 = (() => 'ActiveXObject' in window)()
    return compare('MSIE') || ie11
}

export function regExpRule({regArr,type,val}) {
    if(!Array.isArray(regArr))return;
    let reuslt = {
            status:'',
            errTip : ''
        }
    regArr.forEach(item=>{
        if(type === item.fieldName){ 
            if(!new RegExp(item.frontRegExp).test(val)){
                Object.assign(reuslt,{
                    status:'no-pass',
                    errTip : reuslt.errTip?item.errTip+'<br>'+reuslt.errTip : item.errTip+'<br>' 
                })
            }else {
                Object.assign(reuslt,{
                    status:reuslt.errTip?'no-pass':'pass',
                    errTip : reuslt.errTip?reuslt.errTip:''
                })
            }
        }
    })
    return reuslt
}

export function getWeek(dt){
    let d1 = new Date(dt);
    let d2 = new Date(dt);
    d2.setMonth(0);
    d2.setDate(1);
    let rq = d1 - d2;
    let days = Math.ceil(rq / (24 * 60 * 60 * 1000));
    let num = Math.ceil(days / 7);
    return num;
}

export function deepCopy(obj) {
    let newObj = obj.constructor === Array ? [] : {} //判断是深拷贝对象还是数组
    for (let i in obj) {
        if (typeof obj[i] === 'object') {
            newObj[i] = deepCopy(obj[i]) //  如果要拷贝的对象的属性依然是个复合类型，递归
        } else {
            newObj[i] = obj[i]
        }
    }
    return newObj
}

export function dataAddKey(arr,key='key',val=0){
    Array.isArray(arr) && arr.forEach(item=>{
      item[key] = item[val]
        if(item.children && item.children.length === 0){
            delete item.children
        }
        if(item.children && item.children.length){
            dataAddKey(item.children,key,val)
        }
    })
    return arr
}

export function getCurrentDate(){
    let date = new Date()
    let year = date.getFullYear()
    let mon = date.getMonth()+''
    let month = mon.padStart(2,0)
    let day = date.getDate()
    return {
        year,
        month,
        day,
    }
}

export function getLastMonth() {
  let lYear = new Date().getFullYear(); //获取当前时间的年份
  let lMonth = new Date().getMonth(); //获取当前时间的月份
  let lDay = new Date().getDate(); //获取当前时间的天数
  return {
    lYear,
    lMonth,
    lDay,
  }
}

export function getLastYearDay() {
  let lastYear = new Date().getFullYear() - 1; //获取当前时间的年份
  let lastMonth = new Date().getMonth(); //获取当前时间的月份
  let lastDay = new Date().getDate(); //获取当前时间的天数
  return {
    lastYear,
    lastMonth,
    lastDay,
  }
}

export function getCurrentTime(){
  let year = new Date().getFullYear(); //获取当前时间的年份
  let month = new Date().getMonth() + 1; //获取当前时间的月份
  let day = new Date().getDate(); //获取当前时间的天数
  let days = new Date().getDate(); //获取当前时间的天数
  let hours = new Date().getHours(); //获取当前时间的小时
  let minutes = new Date().getMinutes(); //获取当前时间的分数
  let seconds = new Date().getSeconds(); //获取当前时间的秒数
  //当小于 10 的是时候，在前面加 0
  if (month < 10) {
    month = "0" + month;
  }
  if (days < 10) {
    days = "0" + days;
  }
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return {
    year,
    month,
    day,
    days,
    hours,
    minutes,
    seconds
  }
}

export function dataAddChecked(arr,key='key',val=0){
  Array.isArray(arr) && arr.forEach((item,index) => {
    item[key] = item[val]
    if (item.leafNode === 1) {
      for (let i = 1; i <= 12; i++) {
        item[`checked${i}`] = item[`month${i}`] === 0 ? false : true;
      }
    }
    if(item.children && item.children.length === 0){
        delete item.children
    }
    if(item.children && item.children.length){
      dataAddChecked(item.children,key,val)
    }
  })
  return arr
}

export function number2percentage(params,fixed=2,isRed=0) { //数字保留两位小数点
    if((params+'').includes('%'))return params
    let isMinus  = false
    if((params+'').startsWith('-'))isMinus = true
    let newpar = parseFloat(params);
    newpar *=100
    let reg = /^-?[0-9]+.?[0-9]*$/;
 
    if(reg.test(newpar)){
 
        let newNum = newpar.toFixed(fixed);
 
        return isMinus && isRed === 1?`<span class='red'>${newNum}%</span>`: `${newNum}%`;
 
    }else{
        return 0.00.toFixed(fixed) + '%';
    }
 
}

export function toInteger(num,fixed=0,isRed=0){ //去掉小数并三位数','分割
    let numToString = num+''
    if(numToString.includes('%'))return num
    let isMinus  = false
    if(numToString.startsWith('-'))isMinus = true
    num = +num
    if(typeof num === 'number' && !isNaN(num)){
        if(num === 0)return '-'
        let rounding = num.toFixed(fixed)
        return isMinus && isRed === 1?`<span class='red'>${getSplitNum(rounding)}</span>`: `${getSplitNum(rounding)}`;
    }
    if(numToString.includes('/')){
        let splitDivide = numToString.split('/')
        let rounding0 = Number(splitDivide[0]).toFixed(fixed)
        let rounding1 = Number(splitDivide[1]).toFixed(fixed)
        return isMinus && isRed === 1?`<span class='red'>${getSplitNum(rounding0)}/${getSplitNum(rounding1)}</span>`: `${getSplitNum(rounding0)}/${getSplitNum(rounding1)}`;
    }
    return 0;
}

export function getSplitNum(val) {
    val = '' + val // 转换成字符串
    val = val.replaceAll(' ','')
    let isInterger = true
    if(val.startsWith('-'))isInterger=false
    let filterNum = [...val]
    let NumArr = filterNum.filter(item=>!Number.isNaN(Number(item)) || item === '.')
    val= NumArr.join('')
    let filterPoint = NumArr.filter(item=>item === '.')
    let len = filterPoint.length
    let val1 = ''
    let isExistDot = false
    if(len){
        isExistDot = true
        if(len > 1){
            this.$message.error('只可以存在一个小数点')
            this.value = this.value.slice(0,-1) 
            return
        }
        let splitArr = val.split('.')
        val = splitArr[0]
        val1 = splitArr[1]
    }
    let int = val
    int = int.split('').reverse().join('') // 翻转整数
    let temp = '' // 临时变量
    for (let i = 0; i < int.length; i++) {
        temp += int[i]
        if ((i + 1) % 3 === 0 && i !== int.length - 1) {
            temp += ',' // 每隔三个数字拼接一个逗号
        }
    }
    temp = temp.split('').reverse().join('') // 加完逗号之后翻转
    if(isExistDot){
        temp += `.${val1}`
    }
    if(temp === '0')return temp
    return isInterger?temp:'-'+temp
}


export function getRedNum(num) {
  let isMinus = false
  if (num.startsWith('-') && num[2] !== undefined) isMinus = true
  if (isMinus) {
    return `<span class='red'>${num}</span>`
  }
  return num;
}
const keywords ='hydsoft!@#$qazws'
export function encrypt(word){ //aes加
    var key = CryptoJS.enc.Utf8.parse(keywords);
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    return encrypted.toString();
}

export function decrypt(word){//aes解密
    var key = CryptoJS.enc.Utf8.parse(keywords);
    var decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}

// 前推月份
export function getNMonthsAgo(n,isReverse = false) {
    const date = new Date();
    const result = [];
    for (let i = 0; i < n; i++) {
      date.setMonth(date.getMonth() - 1);
      result.push([date.getFullYear(), date.getMonth() + 1]);
    }
    if(isReverse)return result
    return result.reverse();
  }

  export function currentFormatTime(){
    const dt = new Date();
    const y = dt.getFullYear();
    const m = (dt.getMonth() + 1 + "").padStart(2, "0");
    const d = (dt.getDate() + "").padStart(2, "0");
    const hh = (dt.getHours() + "").padStart(2, "0");
    const mm = (dt.getMinutes() + "").padStart(2, "0");
    const ss = (dt.getSeconds() + "").padStart(2, "0");
    return `${y}-${m}-${d} ${hh}点${mm}分${ss}秒`;
}
// 将表头配置处理成colNo1,colNo2...的形式
export function mapDataIndex (arr){
  let colNoCount = 0;
  const mapChildren = children => {
    return children.map(child => {
      if (child.children) {
        return {
          ...child,
          children: mapChildren(child.children),
        };
      } else {
        colNoCount+=1;
        return {
          ...child,
          dataIndex: `colNo${colNoCount}`,
          slotName:`colNo${colNoCount}`
        };
      }
    });
  };
  return arr.map(item => {
    if (item.children) {
      return {
        ...item,
        children: mapChildren(item.children),
      };
    } else {
      colNoCount+=1;
      return {
        ...item,
        dataIndex: `colNo${colNoCount}`,
        slotName: `colNo${colNoCount}`,
      };
    }
  });
};
// 获取当前客户端操作系统信息
export function getPosType() {
  var agent = navigator.userAgent.toLowerCase();
  var isMac = /macintosh|mac os x/i.test(navigator.userAgent);
  if (agent.indexOf("win32") >= 0 || agent.indexOf("wow32") >= 0) {
      return 'window'
  }
  if (agent.indexOf("win64") >= 0 || agent.indexOf("wow64") >= 0) {
    return 'window'
  }
  if (isMac) {
    return 'mac'
  }
}

let SSOExpiresTime = new Date(Date.now()+1000*60*60*24*30).toGMTString() //cookie有效时间
export function addSSOEncrypt(context,value){
    switch (context) {
        case 'development':
            document.cookie = `dev_ssoSecretKey=${value}; domain=.hydsoft.net; path=/; expires=${SSOExpiresTime}`;
            break;
        case 'test':
            document.cookie = `test_ssoSecretKey=${value};path=/; expires=${SSOExpiresTime}`;
            break;
        default:
            break;
    }
}

export function clearCookie(name) {  
  // 设置cookie的过期时间为过去的时间，从而删除cookie  
  let islocal = location.hostname.startsWith('localhost')
  islocal?document.cookie = name + '=; domain=localhost; path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;':document.cookie = name + '=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;';    
}

let expiresTime = new Date(Date.now()+1000*60*60*24*7).toGMTString() //cookie有效时间
export function saveTokenCookie(value,expires=expiresTime){
    let islocal = location.hostname.startsWith('localhost')
    islocal?document.cookie = `${LOGIN_TOKEN}=${value}; path=/`:document.cookie = `${LOGIN_TOKEN}=${value};path=/;expires=${expires}`;
}
export function getCookie(name) {  
  // 将cookie字符串按分号分割成一个数组  
  const cookies = document.cookie.split(";");  

  // 遍历所有cookie，寻找匹配的名称  
  for (let i = 0; i < cookies.length; i++) {  
      const cookie = cookies[i].trim();  
      // 如果找到匹配的cookie，返回它的值  
      if (cookie.startsWith(name + "=")) {  
          return cookie.substring(name.length + 1, cookie.length);  
      }  
  }  

  // 如果没有找到匹配的cookie，返回null  
  return null;  
}

export function clearAllCookies() {  
  var cookies = document.cookie.split(";");  
  for (var i = 0; i < cookies.length; i++) {  
      var cookie = cookies[i];  
      var eqPos = cookie.indexOf("=");  
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      if(isTest){
          if((name+'').trim().startsWith('test_')) document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"; 
      }else {
          if((name+'').trim().startsWith('production_') || (name+'').trim().startsWith('dev_'))document.cookie = name + "=; domain=.hydsoft.net; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"; 
      } 
       
  }  
}
let keyArr = []
// 收入数据处理
export function dealData(arr){
    Array.isArray(arr) && arr.forEach((item,index) => {
        keyArr.push(item.key);
        if(item.analysis == 'C1人数' || item.analysis == '收入上报人数' ||item.analysis == '转包人数'){
          item.isGreenLight = true
        }else{
          item.isGreenLight = false
        }
      if(item.children && item.children.length){
        dealData(item.children)
      }
    })
    return {arr,keyArr}
}
// 单位换算
export function ConversionUnit (arr){
    Array.isArray(arr) && arr.forEach(item=>{
        item.analysis = item.analysis +`(万元)`
        for(var i=1;i<=13;i++){
            if(item[`month${i}`] !== '-'){
              item[`month${i}`] = (Number(item[`month${i}`])/10000).toFixed(2);
            }
        } 
        if(item.total !== '-'){
          item.total = (Number(item.total / 10000)).toFixed(2);
        }
        if(item.children && item.children.length){
            ConversionUnit(item.children)
        }
    })
    return arr
}
