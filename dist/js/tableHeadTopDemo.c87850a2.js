"use strict";(self["webpackChunkoms_frontend"]=self["webpackChunkoms_frontend"]||[]).push([[676],{6007:function(t,e,a){a.d(e,{AN:function(){return l},XX:function(){return o},pN:function(){return n}});const l=[{title:"分析项",dataIndex:"analysis",fixed:"left"},{title:"1月",dataIndex:"month1"},{title:"2月",dataIndex:"month2"},{title:"3月",dataIndex:"month3"},{title:"4月",dataIndex:"month4"},{title:"5月",dataIndex:"month5"},{title:"6月",dataIndex:"month6"},{title:"7月",dataIndex:"month7"},{title:"8月",dataIndex:"month8"},{title:"9月",dataIndex:"month9"},{title:"10月",dataIndex:"month10"},{title:"11月",dataIndex:"month11"},{title:"12月",dataIndex:"month12"},{title:"累计",dataIndex:"total"}],n=[{title:"分析项",dataIndex:"analysis",fixed:"left"},{title:"10月",dataIndex:"month10",titleSlotName:"monthBefore"},{title:"11月",dataIndex:"month11",titleSlotName:"monthAfter"},{title:"11-10月",dataIndex:"monthDifferent",headerCellStyle:{backgroundColor:"rgb(229, 247, 247)"}},{title:"月环比",dataIndex:"MonthonMonth",headerCellStyle:{backgroundColor:"rgb(229, 247, 247)"}},{title:"Q2",dataIndex:"Q2",titleSlotName:"QBefore"},{title:"Q3",dataIndex:"Q3",titleSlotName:"QAfter"},{title:"Q3-Q2",dataIndex:"QDifferent",headerCellStyle:{backgroundColor:"rgb(229, 247, 247)"}},{title:"Q环比",dataIndex:"QonQ",headerCellStyle:{backgroundColor:"rgb(229, 247, 247)"}}],o=[{title:"分析项",dataIndex:"analysis",fixed:"left",width:140},{title:"1月",dataIndex:"month1",width:140},{title:"2月",dataIndex:"month2",width:140},{title:"3月",dataIndex:"month3",width:140},{title:"4月",dataIndex:"month4",width:140},{title:"5月",dataIndex:"month5",width:140},{title:"6月",dataIndex:"month6",width:140},{title:"7月",dataIndex:"month7",width:140},{title:"8月",dataIndex:"month8",width:140},{title:"9月",dataIndex:"month9",width:140},{title:"10月",dataIndex:"month10",width:140},{title:"11月",dataIndex:"month11",width:140},{title:"12月",dataIndex:"month12",width:140},{title:"累计",dataIndex:"total",width:140}]},1061:function(t,e,a){a.r(e),a.d(e,{default:function(){return p}});a(7658);var l=a(3396),n=a(4870),o={__name:"tableHeadTop",props:{tableProps:{type:Object,required:!0},scrollEvtName:{type:String,required:!0},rootDom:{type:String,required:!0}},setup(t,{expose:e}){const a=t;let o=(0,l.FN)().appContext.config.globalProperties.$bus;const d=(0,n.iH)(null);let i=[];const r=(0,n.iH)(null);let s=!0;const c=(0,n.iH)(null),h=(0,n.iH)(null);let m,u=null;function p(){d.value.querySelectorAll("tr th").forEach((t=>{getComputedStyle(t);i.push(t.offsetWidth)}))}(0,l.bv)((()=>{let t;p(),u=document.querySelector(a.rootDom),u&&(u.scrollTop=0),(0,l.Y3)((()=>{let e=u.getBoundingClientRect();t=parseFloat(e.top)})),o.on(a.scrollEvtName,(e=>{let a=c.value.getBoundingClientRect(),l=parseFloat(a.top),n=parseFloat(a.bottom);b(e.scrollTop,e.direction,l,t,n)}))}));let f=!0,x=0;function b(t,e,a,l,n){if("down"===e){if(s){let c=d.value,u=c.cloneNode(!0);u.querySelectorAll("tr th").forEach(((t,e)=>{t.style.width=i[e]+"px",t.style.display="inline-block"})),m=document.createElement("div");let p=document.createElement("div");m.className="_tableHeadTopContainer ",p.className="_tableHeadTopContent",m.appendChild(p),p.appendChild(u),s=!1}function o(t){m.scrollLeft=t.target.scrollLeft,m.parentNode.scrollLeft=t.target.scrollLeft}if(a<=l&&f){let b=d.value;x=t,b.parentNode.parentNode.insertBefore(m,b.parentNode.parentNode.firstElementChild),m.scrollLeft=m.parentNode.scrollLeft,m.addEventListener("scroll",o),m.parentNode.addEventListener("scroll",o),f=!1}if(!s&&a<=l){let v=d.value;m.scrollLeft=v.parentNode.parentNode.scrollLeft,m.style.display="block",m.style.top=l+26+"px",h.value.classList.add("table-header-mask-active"),h.value.style.top=l+"px"}n<=l&&m&&(m.style.display="none",h.value.classList.remove("table-header-mask-active"))}"up"===e&&m&&(n>=l&&(m.style.display="block",h.value.classList.add("table-header-mask-active")),a>=l&&(m.style.top=a+26+"px",h.value.classList.remove("table-header-mask-active")),t<=x&&(m.style.display="none")),m.style.width=r.value.offsetWidth+"px",h.value.style.width=r.value.offsetWidth+2+"px"}return e({computedThWidth:p}),(0,l.Jd)((()=>{o.off(a.scrollEvtName)})),(t,e)=>{const n=(0,l.up)("a-table");return(0,l.wg)(),(0,l.iD)("main",{ref_key:"contentRef",ref:r},[(0,l._)("div",{class:"table-header-mask",ref_key:"tableHeaderMaskRef",ref:h},null,512),(0,l._)("div",{ref_key:"tableContentRef",ref:c},[(0,l.Wm)(n,{columns:a.tableProps.columns,data:a.tableProps.dataSource,loading:a.tableProps.loading,pagination:a.tableProps.pagination},{thead:(0,l.w5)((()=>[(0,l._)("thead",{ref_key:"theadRef",ref:d},null,512)])),_:1},8,["columns","data","loading","pagination"])],512)],512)}}};const d=o;var i=d,r=a(6007);const s={class:"defaultPadding"},c={class:"m-t-100"},h={class:"m-t-100"};var m={__name:"tableHeadTopDemo",setup(t){const e=(0,n.qj)({columns:r.XX,dataSource:[],loading:!1,pagination:!1}),a=()=>{e.loading=!0;let t=[];for(let e=0;e<20;e++){let a={};r.XX.forEach(((t,l)=>{a[t.dataIndex]=t.title+e*l})),t.push(a)}e.dataSource=t,e.loading=!1};return a(),(t,a)=>((0,l.wg)(),(0,l.iD)("div",s,[(0,l._)("div",null,[(0,l.Wm)(i,{tableProps:e,rootDom:"#a-layout-main",scrollEvtName:"handleScroll"},null,8,["tableProps"])]),(0,l._)("div",c,[(0,l.Wm)(i,{tableProps:e,rootDom:"#a-layout-main",scrollEvtName:"handleScroll"},null,8,["tableProps"])]),(0,l._)("div",h,[(0,l.Wm)(i,{tableProps:e,rootDom:"#a-layout-main",scrollEvtName:"handleScroll"},null,8,["tableProps"])])]))}};const u=m;var p=u}}]);
//# sourceMappingURL=tableHeadTopDemo.c87850a2.js.map