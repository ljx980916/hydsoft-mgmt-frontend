"use strict";(self["webpackChunkoms_frontend"]=self["webpackChunkoms_frontend"]||[]).push([[864],{2460:function(e,t,a){a.r(t),a.d(t,{default:function(){return s}});var r=a(3396),i=a(6221);const n={class:"defaultPadding"},o=(0,r._)("div",{id:"zhezhu-container"},null,-1),l=[o];var u={__name:"zhezhuDemo",setup(e){return(0,r.bv)((()=>{var e,t=document.getElementById("zhezhu-container"),a=i.S1(t);e={tooltip:{trigger:"axis",axisPointer:{type:"cross",crossStyle:{color:"#999"}}},grid:{right:"15%",bottom:"10%"},legend:{data:["Evaporation","Precipitation","新增柱","新增柱2","Temperature"]},xAxis:[{type:"category",data:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],axisPointer:{type:"shadow"}}],yAxis:[{type:"value",name:"温度",min:0,max:30,interval:5,axisLabel:{formatter:"{value} °C"}},{type:"value",name:"Evaporation",min:0,max:180,axisTick:{inside:!0},axisLabel:{inside:!0},axisLabel:{formatter:"{value} ml"}},{type:"value",name:"Precipitation",min:0,max:300,position:"right",alignTicks:!0,offset:80,axisLine:{show:!0,lineStyle:{color:"#73C0DE"}},axisLabel:{formatter:"{value} ml"}}],series:[{name:"Evaporation",type:"bar",tooltip:{valueFormatter:function(e){return e+" ml"}},itemStyle:{color:"green"},data:[2,4.9,7,13.2,12.6,8.6,15.6,12.2,4.6,15,6.4,3.3]},{name:"Precipitation",type:"bar",tooltip:{valueFormatter:function(e){return e+" ml"}},itemStyle:{color:"blue"},data:[12,12.9,17,12.2,15.6,3.6,5.6,12.2,9.6,13,6.4,3.3]},{name:"新增柱",type:"bar",tooltip:{valueFormatter:function(e){return e+" ml"}},itemStyle:{color:"green"},data:[3,14.9,7,13.2,5.6,7.6,15.6,12.2,7.6,10,6.4,3.3]},{name:"新增柱2",type:"bar",tooltip:{valueFormatter:function(e){return e+" ml"}},itemStyle:{color:"blue"},data:[3,12.9,10,9.2,7.6,9.6,15.6,12.2,12.6,10,6.4,3.3]},{name:"Temperature",type:"line",yAxisIndex:1,tooltip:{valueFormatter:function(e){return e+" °C"}},data:[112,114.9,122,124.2,120.6,130.6,129.6,127.2,123.6,112,19.4,13.3]}]},e&&a.setOption(e)})),(e,t)=>((0,r.wg)(),(0,r.iD)("div",n,l))}};const m=u;var s=m}}]);
//# sourceMappingURL=zhezhuDemo.80a2bc40.js.map