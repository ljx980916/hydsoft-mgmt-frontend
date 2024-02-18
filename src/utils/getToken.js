import { ACCESS_TOKEN,LOGIN_PATH } from '../store/mutation-types';

export let token = localStorage.getItem(ACCESS_TOKEN) || '';

export let getURLParams = ()=>{
  let URL = window.location.search
  let urlStr = URL.split('?')[1]
  let obj = {}
  if(urlStr){
      let urlSearch = urlStr.indexOf('#')!==-1?urlStr.slice(0,urlStr.indexOf('#')):urlStr
      const urlParams = new URLSearchParams(urlSearch);
      urlParams.forEach((value, key) => {
        obj[key] = value;
      });
  }
  return obj
}
export let goLogin = ()=>{
	let a = document.createElement('a');
	a.href = LOGIN_PATH;
	a.click();
};
