"use strict";(self["webpackChunkoms_frontend"]=self["webpackChunkoms_frontend"]||[]).push([[583],{8942:function(e,t,a){a.d(t,{Bn:function(){return s},CL:function(){return r},Gd:function(){return o},Sl:function(){return d},X4:function(){return n},cR:function(){return i}});var l=a(4471);function o(e){return(0,l.Z)({url:"/LinkAnalysis/queryLinkAnalysisList",method:"post",data:e,timeout:18e4})}function n(e){return(0,l.Z)({url:"/LinkAnalysis/getCustomerLink",method:"post",data:e,timeout:18e4})}function i(e){return(0,l.Z)({url:"/LinkAnalysis/getProjectLink",method:"post",data:e,timeout:18e4})}function r(e){return(0,l.Z)({url:"/yoyAnalysis/queryYoyAnalysis",method:"post",data:e,timeout:18e4})}function d(e){return(0,l.Z)({url:"/yoyAnalysis/getCustomerYoyAnalysis",method:"post",data:e,timeout:18e4})}function s(e){return(0,l.Z)({url:"/yoyAnalysis/getProjectYoyAnalysis",method:"post",data:e,timeout:18e4})}},9766:function(e,t,a){a.d(t,{Z:function(){return s}});var l=a(3396),o=a(7139),n=a(6221),i=a(4870),r={__name:"echartsContainer",props:{route:{type:Array,default:()=>[]},height:{type:Number,default:20},width:{type:Number,default:50}},setup(e){const t=e,a=(0,i.iH)(null);return(0,l.bv)((()=>{var e,l=a.value,o=n.S1(l);e={xAxis:{type:"category",show:!1},yAxis:{type:"value",show:!1},tooltip:{trigger:"item",position:"top",formatter:e=>e.data?.name?.replaceAll("-","<br/>"),appendToBody:!0},series:[{type:"line",symbol:"emptyCircle",symbolSize:3,itemStyle:{color:"#0770FF"},areaStyle:{color:new n.Q.o(0,0,0,1,[{offset:0,color:"rgba(58,77,233,0.8)"},{offset:1,color:"rgba(58,77,233,0.3)"}])},data:t.route}]},e&&o.setOption(e)})),(t,n)=>((0,l.wg)(),(0,l.iD)("div",{ref_key:"echartContainer",ref:a,style:(0,o.j5)({width:e.width+"px",height:e.height+"px",margin:"4px 0 -6px 0"})},null,4))}};const d=r;var s=d},6732:function(e,t,a){a.r(t),a.d(t,{default:function(){return W}});var l=a(3396),o=(a(7658),a(7139)),n=a(9242),i=a(4842),r=a(4870),d=a(4239),s=a(8942),c=a(4722),u=a(9766),p=a(2483);const h={class:"defaultPadding"},m={class:"flex-between"},f={style:{position:"relative",top:"-1px"}},g={class:"m-t-20"},y={class:"pointer"},w={class:"flex-between"},v={style:{position:"relative",top:"-1px"}},x=["onClick"],b={key:1,class:"pointer"},k={class:"flex-between"},N={style:{position:"relative",top:"-1px"}},C=["onClick"],S={key:1,class:"pointer"};var _={__name:"departmentRingSame",setup(e){const t=(0,p.tv)();let{lYear:a}=(0,c.WF)(),{lastYear:_,lastMonth:E}=(0,c.g5)(),{year:H,month:W}=(0,c.Xn)(),A=(0,d.mA)(),I={};const L=(0,r.qj)({columns:[],data:[],defaultExpandedKeys:[],maxHeight:"200px",loading:!1}),D=(0,r.qj)({columns:[],data:[],defaultExpandedKeys:[],maxHeight:"600px",loading:!1}),U=(0,r.qj)({columns:[],data:[],defaultExpandedKeys:[],maxHeight:"600px",loading:!1}),Z=(0,r.iH)("3"),z=(0,r.iH)(null),T=(0,r.qj)({columnTabs:[]});let K=[];const j={"发薪人数":[],"营业收入":[],"销售毛利率":[]},$={canvasLine1:"发薪人数",canvasLine2:"营业收入",canvasLine3:"销售毛利率"},R=(0,r.iH)("1"),Y=(0,r.iH)("total");(0,l.wF)((()=>{q(),G(),le()})),(0,l.bv)((()=>{if(z.value){let e=z.value.$el;(0,l.Y3)((()=>{let t=window.innerHeight,a=e.getBoundingClientRect().top;L.maxHeight=t-a-30+"px"}))}}));const O=e=>{R.value=e},q=()=>{let e=(0,r.IU)(A.getTagColumnList)||[],t=e.filter((e=>"环比分析"===e.report))||[];t.length&&t[0].tier.forEach(((e,t)=>{let a=[],o=[],n=[],i=[],r=[],d=[];e.tags.forEach((e=>{a.push(e.tag),e.columns.forEach((e=>{let{col:t,conf:a,title:s}=e;a=a||{};let p={title:s,dataIndex:t,align:a.align,cellStyle:{"text-align":a.cellAlign},width:a.width,ellipsis:!0,headerCellClass:"noEllipsis",slotName:t,bodyCellClass:"bodyCell",fixed:a.fixed};p.isShow=a.isShow,p.render=({record:e,column:t})=>{let a=e[t.dataIndex];if(Array.isArray(a)){let o=j[$[t.dataIndex]].map(((t,l)=>({name:t.month+"-"+e[t.col],value:a[l]})));return(0,l.Wm)(u.Z,{route:o,height:74,width:100},null)}return"lastDeptName"===t.slotName?(0,l.Wm)((0,l.up)("a-popover"),{"content-style":{background:"rgba(0,0,0,.8)",color:"#fff"},"arrow-style":{background:"rgba(0,0,0,.8)"}},{default:()=>"1"==e.leafNode?(0,l.Wm)("span",{class:"pointer",style:{color:"#165dff"},onclick:()=>fe(e,1)},[e.lastDeptName]):(0,l.Wm)("span",{class:"pointer"},[e.lastDeptName]),content:()=>e.deptName}):(0,l.Wm)("span",{innerHTML:(0,c.HJ)(a)},null)},1===a.canHide?0===a.parentCol?o.push(p):n.push(p):i.push(p),1===a.parentCol?r.push(p):d.push(p)}))})),I["level"+(t+1)]={tabs:a,params:e.params||[],columnTabs:o,columnHasSonTabs:n,noHiddenColumn:i,defaultColumnTabs:d,defaultColumHasSonTabs:r}})),T.columnTabs=I.level1.columnHasSonTabs},P=e=>{let{columnTabs:t,noHiddenColumn:a,defaultColumHasSonTabs:o}=I.level1,n=4;switch(Z.value){case"3":let t=[],a=o.filter((e=>1===e.isShow));e.forEach(((e,l)=>{let o={};o.title=e,o.children=a.map(((e,t)=>(n++,{...e,dataIndex:`colNo${n}`,slotName:`colNo${n}`}))),t.push(o)})),n=4,K=t;break;case"6":let l=[],i=o.filter((e=>1===e.isShow));e.forEach(((e,t)=>{let a={};a.title=e,a.children=i.map(((e,t)=>(n++,{...e,dataIndex:`colNo${n}`,slotName:`colNo${n}`}))),l.push(a)})),n=4,K=l;break;case"12":let r=[],d=o.filter((e=>1===e.isShow));e.forEach(((e,t)=>{let a={};a.title=e,a.children=d.map(((e,t)=>(n++,{...e,dataIndex:`colNo${n}`,slotName:`colNo${n}`}))),r.push(a)})),n=4,K=r;break;default:break}Object.keys(j).forEach((e=>{j[e]=[]})),K.forEach((e=>{if(e.children?.length){let t=[];e.children.forEach((a=>{1===a.isShow&&t.push(a),j.hasOwnProperty(a.title)&&j[a.title].push({month:e.title,col:a.dataIndex})})),e.children=t}})),Object.keys(j).forEach((e=>j[e].reverse()));let i={title:"操作",dataIndex:"action",width:80,fixed:"right",cellStyle:{textAlign:"center"},render({record:e}){return(0,l.Wm)("a",{href:"javaScript:void(0)",onClick:()=>{de(e,"dept")}},[(0,l.Uk)("看图")])}},r=[...t.filter((e=>1===e.isShow)),...a,...K,i];L.columns=r},F=e=>{L.defaultExpandedKeys=e},B=e=>{Z.value=e,G()},J=e=>{switch(e.isShow){case 0:e.isShow=1,M({type:"self",title:e.title,val:1,tab:e});break;case 1:e.isShow=0,M({type:"self",title:e.title,val:0,tab:e});break;default:break}},M=e=>{let{columnTabs:t,defaultColumHasSonTabs:a}=I.level1,l=a.filter((e=>1===e.isShow));if(0===l.length)return i.Z.error("至少选择一项"),void(e.tab.isShow=0===e.tab.isShow?1:0);"parent"===e.type&&t.forEach((t=>{e.title===t.title&&(t.isShow=e.val)})),"self"===e.type&&a.forEach((t=>{e.title===t.title&&(t.isShow=e.val)})),G()},X=e=>{e.forEach((e=>{e.colNo2=JSON.parse(e.colNo2),e.colNo3=JSON.parse(e.colNo3),e.colNo4=JSON.parse(e.colNo4),e.children&&X(e.children)}))},G=()=>{L.data=[],L.loading=!0;let e=[];const t={"发薪人数":"colNo1","营业收入":"colNo2","销售毛利":"colNo3","销售毛利率":"colNo4","直接成本":"colNo5","人均营业收入":"colNo6","人均直接成本":"colNo7","未完工项目成本":"colNo8","招聘费用":"colNo9","销售费用":"colNo10","管理费用":"colNo11"};T.columnTabs.filter((e=>1===e.isShow)).forEach((a=>{t[a.title]&&e.push(t[a.title]),a.children&&a.children.forEach((a=>{t[a.title]&&e.push(t[a.title])}))}));const a={interval:Number(Z.value),dynamicHeaderParam:Array.from(new Set(e)),xAxis:74,yAxis:100,tagKey:"linkAnalysis"};(0,s.Gd)(a).then((e=>{if("200"==e.code){P(e.data.month),X(e.data.data);let t=(0,c.th)(e.data.data,"key","deptId"),a=[];e.data.data.forEach((e=>a.push(e.deptId))),L.defaultExpandedKeys=a,L.data=(0,r.Xl)(t)}else i.Z.error(e.message);L.loading=!1})).catch((e=>{"ERR_CANCELED"===e?.code?L.loading=!0:(i.Z.error(e?.message||"数据请求错误"),L.loading=!1)}))},Q=(0,r.iH)([]),V=(0,r.iH)([]),ee=(0,r.XI)([]),te=(0,r.iH)(null),ae=(0,r.iH)(null),le=()=>{Q.value=[],V.value=[],ee.value=[];let e=(0,r.IU)(A.getTagColumnList)||[],t=e.filter((e=>"同比分析"===e.report))||[];if(t.length){const e=t[0].tier[0].tags[0].columns;e.forEach((e=>{const{col:t,conf:a,title:l}=e;let o={title:l,dataIndex:t,align:a.align,cellStyle:{"text-align":a.cellAlign},width:a.width,ellipsis:!0,headerCellClass:"noEllipsis",slotName:t,bodyCellClass:"bodyCell",isShow:a.isShow,fixed:a.fixed};1==a.canHide?Q.value.push(o):ee.value.push(o),void 0!==a.fixed&&(o.fixed=a.fixed),1==a.parentCol&&V.value.push(o)})),"total"==Y.value?ne(Q.value):ce(Q.value)}},oe=e=>{e.isShow=0===e.isShow?1:0;let t=Q.value.filter((e=>1===e.isShow));if(0===t.length)return i.Z.error("至少选择一项"),void(e.isShow=0===e.isShow?1:0);handleAbortRequest(),"total"===Y.value?ne(Q.value):ce(Q.value)},ne=e=>{let t=e.filter((e=>1===e.isShow)),a=[],o=[{title:_+"/1-12"},{title:_+`/1-${E}`},{title:H+`/1-${E}`},{title:"同比"}],n=5;t.forEach((e=>{let t={title:e.title,children:o.map(((t,a)=>{let l={title:t.title,dataIndex:`colNo${n}`,slotName:`colNo${n}`,width:110,cellStyle:{textAlign:"right"}};return a===o.length-1&&(l.title=e.title.endsWith("率")?"偏离":t.title),n++,l}))};a.push(t)}));let i={title:"操作",dataIndex:"action",width:80,fixed:"right",cellStyle:{textAlign:"center"},render({record:e}){return(0,l.Wm)("a",{href:"javaScript:void(0)",onClick:()=>{re(e,"dept")}},[(0,l.Uk)("看图")])}};D.columns=[...ee.value,...a,i],he()},ie=e=>{D.defaultExpandedKeys=e},re=(e,a)=>{t.push({name:"lookChart",state:{barChartOptions:JSON.stringify(Q.value),deptId:e.deptId,sourceType:a,deptName:e.deptName}})},de=(e,a)=>{t.push({name:"ringContrastChart",state:{deptName:e.deptName,interval:Z.value,deptId:e.deptId,sourceType:a}})},se=e=>{Y.value=e,le()},ce=e=>{const t=[];let a=e.filter((e=>1===e.isShow));if(1==W)for(var o=1;o<=12;o++)t.push({title:o+"月",children:[]});else for(o=1;o<=E;o++)t.push({title:o+"月",children:[]});const n=[_,H];let i=5;t.forEach((e=>{let t=[];a.forEach((e=>{n.forEach((a=>{let l={title:`${e.title}${a}`,dataIndex:`colNo${i}`,slotName:`colNo${i}`,width:e.width,cellStyle:(0,r.IU)(e.cellStyle)};t.push(l),i++}))})),e.children=t}));let d={title:"操作",dataIndex:"action",width:80,fixed:"right",cellStyle:{textAlign:"center"},render({record:e}){return(0,l.Wm)("a",{href:"javaScript:void(0)",onClick:()=>{re(e,"dept")}},[(0,l.Uk)("看图")])}};U.columns=[...ee.value,...t,d],pe()},ue=e=>{U.defaultExpandedKeys=e},pe=()=>{let e={interval:0==E?12:E,dynamicHeaderParam:V.value.filter((e=>1===e.isShow)).map((e=>e.dataIndex)),xAxis:74,yAxis:100,tagKey:"yoyAnalysis",type:"2"};U.loading=!0,(0,s.CL)(e).then((e=>{if("200"===e.code){(0,c.th)(e.data.data,"key","deptId");let t=[];e.data.data.forEach((e=>t.push(e.key))),U.defaultExpandedKeys=t,U.data=e.data.data,"600px"===U.maxHeight&&(0,l.Y3)((()=>{if(te.value){let e=te.value.$el,t=window.innerHeight,a=e.getBoundingClientRect().top;U.maxHeight=Math.round(t-a-32)+"px"}}))}else i.Z.error(e.desc||"请求数据失败");U.loading=!1})).catch((e=>{"ERR_CANCELED"===e?.code?U.loading=!0:(i.Z.error(e?.message||"数据请求错误"),U.loading=!1)}))},he=()=>{let e={interval:0==E?12:E,dynamicHeaderParam:V.value.filter((e=>1===e.isShow)).map((e=>e.dataIndex)),xAxis:74,yAxis:100,tagKey:"yoyAnalysis",type:"1"};D.loading=!0,(0,s.CL)(e).then((e=>{if("200"===e.code){(0,c.th)(e.data.data,"key","deptId");let t=[];e.data.data.forEach((e=>t.push(e.key))),D.defaultExpandedKeys=t,D.data=e.data.data,"600px"===D.maxHeight&&(0,l.Y3)((()=>{if(ae.value){let e=ae.value.$el,t=window.innerHeight,a=e.getBoundingClientRect().top;D.maxHeight=Math.round(t-a-32)+"px"}}))}else i.Z.error(e.desc||"请求数据失败");D.loading=!1})).catch((e=>{"ERR_CANCELED"===e?.code?D.loading=!0:(i.Z.error(e?.message||"数据请求错误"),D.loading=!1)}))},me=(e,t)=>j[$[t.dataIndex]].map(((a,l)=>({value:e[t.dataIndex][l]}))),fe=(e,a)=>{t.push({path:"/customerRingSame",query:{id:e.deptId,deptName:e.deptName,tab:a}})};return(e,t)=>{const a=(0,l.up)("a-tag"),i=(0,l.up)("a-space"),r=(0,l.up)("a-option"),d=(0,l.up)("icon-calendar"),s=(0,l.up)("a-select"),c=(0,l.up)("a-popover"),p=(0,l.up)("a-table"),_=(0,l.up)("a-tab-pane"),E=(0,l.up)("a-radio"),H=(0,l.up)("a-radio-group"),W=(0,l.up)("a-tabs");return(0,l.wg)(),(0,l.iD)("div",h,[(0,l.Wm)(W,{"active-key":R.value,"onUpdate:active-key":t[3]||(t[3]=e=>R.value=e),onChange:O},{default:(0,l.w5)((()=>[(0,l.Wm)(_,{key:"1",title:"环比分析",class:"p-t-10"},{default:(0,l.w5)((()=>[(0,l._)("div",m,[(0,l.Wm)(i,{size:["small",0],wrap:""},{default:(0,l.w5)((()=>[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(T.columnTabs,((e,t)=>((0,l.wg)(),(0,l.j4)(a,{key:t,color:1===e.isShow?"arcoblue":"",size:"large",class:"pointer",onClick:t=>J(e)},{default:(0,l.w5)((()=>[(0,l.Uk)((0,o.zw)(e.title),1)])),_:2},1032,["color","onClick"])))),128))])),_:1}),(0,l._)("div",f,[(0,l.Wm)(s,{"model-value":Z.value,"onUpdate:model-value":t[0]||(t[0]=e=>Z.value=e),onChange:B},{"arrow-icon":(0,l.w5)((()=>[(0,l.Wm)(d,{size:16})])),default:(0,l.w5)((()=>[(0,l.Wm)(r,{value:"3"},{default:(0,l.w5)((()=>[(0,l.Uk)("近3个月")])),_:1}),(0,l.Wm)(r,{value:"6"},{default:(0,l.w5)((()=>[(0,l.Uk)("近6个月")])),_:1}),(0,l.Wm)(r,{value:"12"},{default:(0,l.w5)((()=>[(0,l.Uk)("近12个月")])),_:1})])),_:1},8,["model-value"])])]),(0,l._)("div",g,[(0,l.Wm)(p,{columns:L.columns,data:L.data,"default-expand-all-rows":!0,bordered:{cell:!0},"column-resizable":"","expanded-keys":L.defaultExpandedKeys,scroll:{maxHeight:L.maxHeight},scrollbar:{x:!0,y:1500},pagination:!1,loading:L.loading,ref_key:"tableRef",ref:z,onExpandedChange:F},{lastDeptName:(0,l.w5)((({record:e})=>[(0,l.Wm)(c,{"content-style":{background:"rgba(0,0,0,.8)",color:"#fff"},"arrow-style":{background:"rgba(0,0,0,.8)"}},{content:(0,l.w5)((()=>[(0,l.Uk)((0,o.zw)(e.deptName),1)])),default:(0,l.w5)((()=>[(0,l._)("span",y,(0,o.zw)(e.lastDeptName),1)])),_:2},1032,["content-style","arrow-style"])])),_:1},8,["columns","data","expanded-keys","scroll","loading"])])])),_:1}),(0,l.Wm)(_,{key:"2",title:"同比分析",class:"p-t-10"},{default:(0,l.w5)((()=>[(0,l.wy)((0,l._)("div",null,[(0,l._)("div",w,[(0,l.Wm)(i,{size:["small",0],wrap:""},{default:(0,l.w5)((()=>[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(V.value,((e,t)=>((0,l.wg)(),(0,l.j4)(a,{key:t,color:1===e.isShow?"arcoblue":"",size:"large",class:"pointer",onClick:t=>oe(e)},{default:(0,l.w5)((()=>[(0,l.Uk)((0,o.zw)(e.title),1)])),_:2},1032,["color","onClick"])))),128))])),_:1}),(0,l._)("div",v,[(0,l.Wm)(H,{"model-value":Y.value,"onUpdate:model-value":t[1]||(t[1]=e=>Y.value=e),type:"button",onChange:se},{default:(0,l.w5)((()=>[(0,l.Wm)(E,{value:"total"},{default:(0,l.w5)((()=>[(0,l.Uk)("汇总")])),_:1}),(0,l.Wm)(E,{value:"detail"},{default:(0,l.w5)((()=>[(0,l.Uk)("明细")])),_:1})])),_:1},8,["model-value"])])]),(0,l.Wm)(p,{columns:D.columns,data:D.data,"default-expand-all-rows":!0,bordered:{cell:!0},"column-resizable":"","expanded-keys":D.defaultExpandedKeys,scroll:{maxHeight:D.maxHeight},scrollbar:{x:!0,y:1500},pagination:!1,loading:D.loading,ref_key:"sameTotalTableRef",ref:ae,class:"m-t-20",onExpandedChange:ie},{lastDeptName:(0,l.w5)((({record:e})=>[(0,l.Wm)(c,{"content-style":{background:"rgba(0,0,0,.8)",color:"#fff"},"arrow-style":{background:"rgba(0,0,0,.8)"}},{content:(0,l.w5)((()=>[(0,l.Uk)((0,o.zw)(e.deptName),1)])),default:(0,l.w5)((()=>[e.children?((0,l.wg)(),(0,l.iD)("span",b,(0,o.zw)(e.lastDeptName),1)):((0,l.wg)(),(0,l.iD)("a",{key:0,href:"javaScript:void(0)",style:{color:"#165dff"},onClick:t=>fe(e,2)},(0,o.zw)(e.lastDeptName),9,x))])),_:2},1032,["content-style","arrow-style"])])),canvasLine1:(0,l.w5)((({record:e,column:t})=>[(0,l.Wm)(u.Z,{route:me(e,t),height:74,width:100},null,8,["route"])])),canvasLine2:(0,l.w5)((({record:e,column:t})=>[(0,l.Wm)(u.Z,{route:me(e,t),height:74,width:100},null,8,["route"])])),canvasLine3:(0,l.w5)((({record:e,column:t})=>[(0,l.Wm)(u.Z,{route:me(e,t),height:74,width:100},null,8,["route"])])),_:1},8,["columns","data","expanded-keys","scroll","loading"])],512),[[n.F8,"total"===Y.value]]),(0,l.wy)((0,l._)("div",null,[(0,l._)("div",k,[(0,l.Wm)(i,{size:["small",0],wrap:""},{default:(0,l.w5)((()=>[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(V.value,((e,t)=>((0,l.wg)(),(0,l.j4)(a,{key:t,color:1===e.isShow?"arcoblue":"",size:"large",class:"pointer",onClick:t=>oe(e)},{default:(0,l.w5)((()=>[(0,l.Uk)((0,o.zw)(e.title),1)])),_:2},1032,["color","onClick"])))),128))])),_:1}),(0,l._)("div",N,[(0,l.Wm)(H,{"model-value":Y.value,"onUpdate:model-value":t[2]||(t[2]=e=>Y.value=e),type:"button",onChange:se},{default:(0,l.w5)((()=>[(0,l.Wm)(E,{value:"total"},{default:(0,l.w5)((()=>[(0,l.Uk)("汇总")])),_:1}),(0,l.Wm)(E,{value:"detail"},{default:(0,l.w5)((()=>[(0,l.Uk)("明细")])),_:1})])),_:1},8,["model-value"])])]),(0,l.Wm)(p,{columns:U.columns,data:U.data,"default-expand-all-rows":!0,bordered:{cell:!0},"column-resizable":"","expanded-keys":U.defaultExpandedKeys,scroll:{maxHeight:U.maxHeight},scrollbar:{x:!0,y:1500},pagination:!1,loading:U.loading,ref_key:"sameDetailTableRef",ref:te,class:"m-t-20",onExpandedChange:ue},{lastDeptName:(0,l.w5)((({record:e})=>[(0,l.Wm)(c,{"content-style":{background:"rgba(0,0,0,.8)",color:"#fff"},"arrow-style":{background:"rgba(0,0,0,.8)"}},{content:(0,l.w5)((()=>[(0,l.Uk)((0,o.zw)(e.deptName),1)])),default:(0,l.w5)((()=>[e.children?((0,l.wg)(),(0,l.iD)("span",S,(0,o.zw)(e.lastDeptName),1)):((0,l.wg)(),(0,l.iD)("a",{key:0,href:"javaScript:void(0)",style:{color:"#165dff"},onClick:t=>fe(e,2)},(0,o.zw)(e.lastDeptName),9,C))])),_:2},1032,["content-style","arrow-style"])])),canvasLine1:(0,l.w5)((({record:e,column:t})=>[(0,l.Wm)(u.Z,{route:me(e,t),height:74,width:100},null,8,["route"])])),canvasLine2:(0,l.w5)((({record:e,column:t})=>[(0,l.Wm)(u.Z,{route:me(e,t),height:74,width:100},null,8,["route"])])),canvasLine3:(0,l.w5)((({record:e,column:t})=>[(0,l.Wm)(u.Z,{route:me(e,t),height:74,width:100},null,8,["route"])])),_:1},8,["columns","data","expanded-keys","scroll","loading"])],512),[[n.F8,"detail"===Y.value]])])),_:1})])),_:1},8,["active-key"])])}}},E=a(89);const H=(0,E.Z)(_,[["__scopeId","data-v-1ba4357b"]]);var W=H}}]);
//# sourceMappingURL=departmentRingSame.f35c6338.js.map