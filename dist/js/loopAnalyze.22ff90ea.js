"use strict";(self["webpackChunkoms_frontend"]=self["webpackChunkoms_frontend"]||[]).push([[286],{8942:function(e,l,t){t.d(l,{Bn:function(){return u},CL:function(){return s},Gd:function(){return o},Sl:function(){return r},X4:function(){return n},cR:function(){return i}});var a=t(4471);function o(e){return(0,a.Z)({url:"/LinkAnalysis/queryLinkAnalysisList",method:"post",data:e,timeout:18e4})}function n(e){return(0,a.Z)({url:"/LinkAnalysis/getCustomerLink",method:"post",data:e,timeout:18e4})}function i(e){return(0,a.Z)({url:"/LinkAnalysis/getProjectLink",method:"post",data:e,timeout:18e4})}function s(e){return(0,a.Z)({url:"/yoyAnalysis/queryYoyAnalysis",method:"post",data:e,timeout:18e4})}function r(e){return(0,a.Z)({url:"/yoyAnalysis/getCustomerYoyAnalysis",method:"post",data:e,timeout:18e4})}function u(e){return(0,a.Z)({url:"/yoyAnalysis/getProjectYoyAnalysis",method:"post",data:e,timeout:18e4})}},4335:function(e,l,t){t.d(l,{Z:function(){return u}});var a=t(3396),o=t(7139),n=t(4870);const i=["width","height"];var s={__name:"canvasContainer",props:{route:{type:Array,default:()=>[]},height:{type:Number,default:20},width:{type:Number,default:50}},setup(e){const l=e;(0,a.YP)((()=>l.route),((e,l)=>{e!==l&&s()}));const t=(0,n.iH)(null),s=()=>{let e=t.value&&t.value.getContext("2d");e.clearRect(0,0,l.width,l.height),e.translate(0,l.height),e.scale(1,-1),e.moveTo(...l.route[0]),e.clearRect(0,0,50,20),l.route.forEach((l=>{e.lineTo(...l),e.strokeStyle="blue",e.stroke()}))};return(0,a.bv)((()=>{s()})),(e,n)=>((0,a.wg)(),(0,a.iD)("canvas",{width:l.width,height:l.height,ref_key:"canvasEl",ref:t,style:(0,o.j5)({padding:"10px",backgroundColor:"rgb(var(--arcoblue-1))"})},null,12,i))}};const r=s;var u=r},6042:function(e,l,t){t.r(l),t.d(l,{default:function(){return C}});t(7658);var a=t(3396),o=t(7139),n=t(9242),i=t(4870),s=t(4239),r=t(8942),u=t(4722),c=t(4335),d=t(4842);const p={class:"defaultPadding"},h=(0,a._)("span",null,"部门名称：",-1),m=(0,a._)("span",{class:"m-l-16"},"客户名称：",-1),f=(0,a._)("span",{class:"m-l-16"},"项目名称：",-1),w={class:"m-t-20 flex-between"},g={style:{"align-self":"flex-start"}},v={class:"m-b-20"},y={class:"border-r"},b={style:{"align-self":"flex-start"}},k={class:"m-t-20"};var x={__name:"loopAnalyze",setup(e){let l=(0,s.mA)(),t={};const x=(0,i.iH)(!1),_=(0,i.qj)({columns:[],data:[],maxHeight:"200px",loading:!1}),C=(0,i.iH)("3"),N=(0,i.iH)(null),S=(0,i.qj)({columnTabs:[],up:[],down:[]}),$=(0,i.iH)(""),W=(0,i.iH)(""),H=(0,i.iH)("");(0,a.bv)((()=>{if(N.value){let e=N.value.$el;(0,a.Y3)((()=>{let l=window.innerHeight,t=e.getBoundingClientRect().top;_.maxHeight=l-t-30+"px"}))}}));const E=()=>{let e=(0,i.IU)(l.getTagColumnList)||[],a=e.filter((e=>"环比分析"===e.report))||[];a.length&&a[0].tier.forEach(((e,l)=>{let a=[],o=[],n=[],i=[],s=[],r=[];e.tags.forEach((e=>{a.push(e.tag),e.columns.forEach((e=>{let{col:l,conf:t,title:a}=e;t=t||{};let u={title:a,dataIndex:l,align:t.align,cellStyle:{"text-align":t.cellAlign},width:t.width,ellipsis:!0,headerCellClass:"noEllipsis",slotName:l};u.isShow=t.isShow,void 0!==t.fixed&&(u.fixed=t.fixed),void 0!==t.toFixed&&(t.showPercent,u.render=({record:e})=>e[l]),1===t.canHide?0===t.parentCol?o.push(u):n.push(u):i.push(u),1===t.parentCol?s.push(u):r.push(u)}))})),t["level"+(l+1)]={tabs:a,params:e.params||[],columnTabs:o,columnHasSonTabs:n,noHiddenColumn:i,defaultColumnTabs:r,defaultColumHasSonTabs:s}})),S.columnTabs=t.level1.columnTabs,S.up=t.level1.columnHasSonTabs.slice(0,5),S.down=t.level1.columnHasSonTabs.slice(5)};let T=[];const U=()=>{let{columnTabs:e,noHiddenColumn:l,defaultColumHasSonTabs:a}=t.level1,o=6;switch(C.value){case"3":let e=(0,u.Fp)(3),l=[],t=a.filter((e=>1===e.isShow));e.forEach(((e,a)=>{let n={};n.title=`${e[0]}年${e[1]}月`,n.children=t.map(((l,t)=>(o++,{...l,dataIndex:`${e[0]}${(""+e[1]).padStart(2,"0")}col${o}`,slotName:`${e[0]}${(""+e[1]).padStart(2,"0")}col${o}`}))),l.push(n)})),o=0,T=l;break;case"6":let n=(0,u.Fp)(6),i=[],s=a.filter((e=>1===e.isShow));n.forEach(((e,l)=>{let t={};t.title=`${e[0]}年${e[1]}月`,t.children=s.map(((l,t)=>(o++,{...l,dataIndex:`${e[0]}${(""+e[1]).padStart(2,"0")}col${o}`,slotName:`${e[0]}${(""+e[1]).padStart(2,"0")}col${o}`}))),i.push(t)})),o=0,T=i;break;case"12":let r=(0,u.Fp)(12),c=[],d=a.filter((e=>1===e.isShow));r.forEach(((e,l)=>{let t={};t.title=`${e[0]}年${e[1]}月`,t.children=d.map(((l,t)=>(o++,{...l,dataIndex:`${e[0]}${(""+e[1]).padStart(2,"0")}col${o}`,slotName:`${e[0]}${(""+e[1]).padStart(2,"0")}col${o}`}))),c.push(t)})),o=0,T=c;break;default:break}T.forEach((e=>{e.children?.length&&(e.children=e.children.filter((e=>1===e.isShow)))}));let n=[...e.filter((e=>1===e.isShow)),...l,...T],i=0;n.forEach((e=>{i+=1,e.children?(i-=1,e.children.forEach((e=>{i+=1,e.dataIndex=`colNo${i}`,e.slotName=`colNo${i}`}))):(e.dataIndex=`colNo${i}`,e.slotName=`colNo${i}`)})),_.columns=n;var s=_.columns.findIndex((e=>e.children));H.value=_.columns[s-1].dataIndex,W.value=_.columns[s-2].dataIndex,$.value=_.columns[s-3].dataIndex},I=e=>{C.value=e,U(),z()};(0,a.wF)((()=>{E(),U(),z()}));const A=e=>{switch(e.isShow){case 0:e.isShow=1,j({type:"parent",title:e.title,val:1});break;case 1:e.isShow=0,j({type:"parent",title:e.title,val:0});break;default:break}},L=e=>{switch(e.isShow){case 0:e.isShow=1,j({type:"self",title:e.title,val:1});break;case 1:e.isShow=0,j({type:"self",title:e.title,val:0});break;default:break}},j=e=>{let{columnTabs:l,noHiddenColumn:a,defaultColumHasSonTabs:o}=t.level1,n=[],i=o.filter((e=>1===e.isShow));"parent"===e.type&&l.forEach((l=>{e.title===l.title&&(l.isShow=e.val)})),"self"===e.type&&o.forEach((l=>{e.title===l.title&&(l.isShow=e.val)}));let s=(0,u.Fp)(C.value),r=[],c=0;s.forEach(((e,l)=>{let t={};t.title=`${e[0]}年${e[1]}月`,t.children=i.map(((l,t)=>(c++,{...l,dataIndex:`${e[0]}${(""+e[1]).padStart(2,"0")}col${c}`,slotName:`${e[0]}${(""+e[1]).padStart(2,"0")}col${c}`}))),r.push(t)})),n=[...l.filter((e=>1===e.isShow)),...a,...r];let d=0;n.forEach((e=>{d+=1,e.children?(d-=1,e.children.forEach((e=>{d+=1,e.dataIndex=`colNo${d}`,e.slotName=`colNo${d}`}))):(e.dataIndex=`colNo${d}`,e.slotName=`colNo${d}`)})),_.columns=n;var p=_.columns.findIndex((e=>e.children));H.value=_.columns[p-1].dataIndex,W.value=_.columns[p-2].dataIndex,$.value=_.columns[p-3].dataIndex,z()},z=()=>{_.data=[],_.loading=!0;let e=[];var l=JSON.parse(JSON.stringify(_.columns));l.forEach((l=>{"部门名称"===l.title&&e.push("deptName"),"客户名称"===l.title&&e.push("customerName"),"项目名称"===l.title&&e.push("projectName"),"收入趋势"===l.title&&e.push("canvasLine1"),"成本趋势"===l.title&&e.push("canvasLine2"),"毛利率趋势"===l.title&&e.push("canvasLine3"),l.children&&l.children.forEach((l=>{"人数"===l.title&&e.push("colNo1"),"营业收入"===l.title&&e.push("colNo2"),"销售毛利"===l.title&&e.push("colNo3"),"销售毛利率"===l.title&&e.push("colNo4"),"直接成本"===l.title&&e.push("colNo5"),"人均营业收入"===l.title&&e.push("colNo6"),"人均直接成本"===l.title&&e.push("colNo7"),"未完工项目成本"===l.title&&e.push("colNo8"),"招聘费用"===l.title&&e.push("colNo9"),"销售费用"===l.title&&e.push("colNo10"),"管理费用"===l.title&&e.push("colNo11")}))}));const t={interval:Number(C.value),dynamicHeaderParam:Array.from(new Set(e)),xAxis:50,yAxis:20};(0,r.Gd)(t).then((e=>{"200"==e.code&&(_.data=e.data)})).catch((e=>{d.Z.error(e.message||"请求失败")})).finally((()=>{_.loading=!1}))},Z=()=>{z()},D=()=>{},P=()=>{x.value=!1},Y=()=>{x.value=!0};return(e,l)=>{const t=(0,a.up)("a-option"),i=(0,a.up)("a-select"),s=(0,a.up)("icon-search"),r=(0,a.up)("a-button"),u=(0,a.up)("icon-refresh"),d=(0,a.up)("a-space"),E=(0,a.up)("a-tag"),T=(0,a.up)("icon-up-circle"),U=(0,a.up)("icon-down-circle"),j=(0,a.up)("a-radio"),z=(0,a.up)("a-radio-group"),K=(0,a.up)("a-table");return(0,a.wg)(),(0,a.iD)("div",p,[(0,a._)("div",null,[(0,a.Wm)(d,{wrap:""},{default:(0,a.w5)((()=>[h,(0,a.Wm)(i,{style:{width:"230px"},placeholder:"输入并选择部门名称","allow-search":""},{default:(0,a.w5)((()=>[(0,a.Wm)(t,null,{default:(0,a.w5)((()=>[(0,a.Uk)("Beijing")])),_:1}),(0,a.Wm)(t,null,{default:(0,a.w5)((()=>[(0,a.Uk)("Shanghai")])),_:1}),(0,a.Wm)(t,null,{default:(0,a.w5)((()=>[(0,a.Uk)("Guangzhou")])),_:1}),(0,a.Wm)(t,{disabled:""},{default:(0,a.w5)((()=>[(0,a.Uk)("Disabled")])),_:1})])),_:1}),m,(0,a.Wm)(i,{style:{width:"230px"},placeholder:"输入并选择客户名称","allow-search":""},{default:(0,a.w5)((()=>[(0,a.Wm)(t,null,{default:(0,a.w5)((()=>[(0,a.Uk)("Beijing")])),_:1}),(0,a.Wm)(t,null,{default:(0,a.w5)((()=>[(0,a.Uk)("Shanghai")])),_:1}),(0,a.Wm)(t,null,{default:(0,a.w5)((()=>[(0,a.Uk)("Guangzhou")])),_:1}),(0,a.Wm)(t,{disabled:""},{default:(0,a.w5)((()=>[(0,a.Uk)("Disabled")])),_:1})])),_:1}),f,(0,a.Wm)(i,{style:{width:"230px"},placeholder:"输入项目名称","allow-search":""},{default:(0,a.w5)((()=>[(0,a.Wm)(t,null,{default:(0,a.w5)((()=>[(0,a.Uk)("Beijing")])),_:1}),(0,a.Wm)(t,null,{default:(0,a.w5)((()=>[(0,a.Uk)("Shanghai")])),_:1}),(0,a.Wm)(t,null,{default:(0,a.w5)((()=>[(0,a.Uk)("Guangzhou")])),_:1}),(0,a.Wm)(t,{disabled:""},{default:(0,a.w5)((()=>[(0,a.Uk)("Disabled")])),_:1})])),_:1}),(0,a.Wm)(r,{type:"primary",style:{"margin-left":"16px"},onClick:Z},{icon:(0,a.w5)((()=>[(0,a.Wm)(s)])),default:(0,a.w5)((()=>[(0,a.Uk)("搜索")])),_:1}),(0,a.Wm)(r,{onClick:D},{icon:(0,a.w5)((()=>[(0,a.Wm)(u)])),default:(0,a.w5)((()=>[(0,a.Uk)("重置")])),_:1})])),_:1})]),(0,a._)("div",w,[(0,a._)("div",g,[(0,a._)("div",v,[(0,a.Wm)(d,{wrap:""},{default:(0,a.w5)((()=>[(0,a._)("div",y,[(0,a.Wm)(d,null,{default:(0,a.w5)((()=>[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(S.columnTabs,((e,l)=>((0,a.wg)(),(0,a.j4)(E,{key:l,color:1===e.isShow?"arcoblue":"",size:"large",class:"pointer",onClick:l=>A(e)},{default:(0,a.w5)((()=>[(0,a.Uk)((0,o.zw)(e.title),1)])),_:2},1032,["color","onClick"])))),128))])),_:1})]),((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(S.up,((e,l)=>((0,a.wg)(),(0,a.j4)(E,{key:l,color:1===e.isShow?"arcoblue":"",size:"large",class:"pointer",onClick:l=>L(e)},{default:(0,a.w5)((()=>[(0,a.Uk)((0,o.zw)(e.title),1)])),_:2},1032,["color","onClick"])))),128)),x.value?((0,a.wg)(),(0,a.j4)(T,{key:0,class:"pointer",size:"20",onClick:P})):((0,a.wg)(),(0,a.j4)(U,{key:1,class:"pointer",size:"20",onClick:Y}))])),_:1})]),(0,a.Wm)(n.uT,{appear:""},{default:(0,a.w5)((()=>[(0,a.wy)((0,a._)("div",null,[(0,a.Wm)(d,{wrap:""},{default:(0,a.w5)((()=>[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(S.down,((e,l)=>((0,a.wg)(),(0,a.j4)(E,{key:l,color:1===e.isShow?"arcoblue":"",size:"large",class:"pointer",onClick:l=>L(e)},{default:(0,a.w5)((()=>[(0,a.Uk)((0,o.zw)(e.title),1)])),_:2},1032,["color","onClick"])))),128))])),_:1})],512),[[n.F8,x.value]])])),_:1})]),(0,a._)("div",b,[(0,a.Wm)(z,{type:"button","model-value":C.value,"onUpdate:model-value":l[0]||(l[0]=e=>C.value=e),size:"large",onChange:I},{default:(0,a.w5)((()=>[(0,a.Wm)(j,{value:"3"},{default:(0,a.w5)((()=>[(0,a.Uk)("近3个月")])),_:1}),(0,a.Wm)(j,{value:"6"},{default:(0,a.w5)((()=>[(0,a.Uk)("近6个月")])),_:1}),(0,a.Wm)(j,{value:"12"},{default:(0,a.w5)((()=>[(0,a.Uk)("近12个月")])),_:1})])),_:1},8,["model-value"])])]),(0,a._)("div",k,[(0,a.Wm)(K,{columns:_.columns,data:_.data,"column-resizable":"",scroll:{maxHeight:_.maxHeight},scrollbar:{x:!0,y:1500},pagination:!1,loading:_.loading,bordered:{cell:!0},ref_key:"tableRef",ref:N},{[$.value]:(0,a.w5)((({record:e})=>[(0,a.Wm)(c.Z,{route:e[$.value],height:20,width:50},null,8,["route"])])),[W.value]:(0,a.w5)((({record:e})=>[(0,a.Wm)(c.Z,{route:e[W.value],height:20,width:50},null,8,["route"])])),[H.value]:(0,a.w5)((({record:e})=>[(0,a.Wm)(c.Z,{route:e[H.value],height:20,width:50},null,8,["route"])])),_:2},1032,["columns","data","scroll","loading"])])])}}};const _=x;var C=_},4144:function(e,l,t){t.r(l),t.d(l,{default:function(){return y}});var a=t(3396),o=(t(7658),t(7139)),n=t(4870),i=t(4239),s=t(4471);function r(e){return(0,s.Z)({url:"/PrerenalComparison/getPretrialComparisonList",method:"post",data:e})}var u=t(4722);const c={class:"defaultPadding"},d=(0,a._)("span",null,"年份：",-1),p={class:"m-t-20 flex-between"},h={style:{"align-self":"flex-start"}},m={class:"m-b-20"},f={class:"m-t-20"},w={href:"javaScript:void(0)",style:{color:"#333"}};var g={__name:"preRealComparsion",setup(e){let l=(0,i.mA)(),t={},{year:s,month:g}=(0,u.Ux)(),v=`${s}`,y=`${g}`;const b=/(\d+)月/g,k=(0,n.iH)(v),x=(0,n.qj)({columns:[],data:[],maxHeight:"200px",loading:!1,defaultExpandedKeys:[]}),_=(0,n.iH)(null),C=(0,n.qj)({tabList:[]});(0,a.bv)((()=>{if(_.value){let e=_.value.$el;(0,a.Y3)((()=>{let l=window.innerHeight,t=e.getBoundingClientRect().top;x.maxHeight=l-t-30+"px"}))}}));const N=()=>{let e=(0,n.IU)(l.getTagColumnList)||[],a=e.filter((e=>"预实对比"===e.report))||[];a.length&&(0==y[0]&&(y=y[1]),a[0].tier.forEach(((e,l)=>{let a=[],o=[],n=[];e.tags.forEach((e=>{a.push(e.tag),e.columns.forEach((e=>{let{col:l,conf:t,title:a}=e;-1!==a.indexOf("月")&&(a=a.replace(b,`${y}月`)),t=t||{};let i={title:a,dataIndex:l,align:t.align,cellStyle:{"text-align":t.cellAlign},width:t.width,ellipsis:!0,headerCellClass:"noEllipsis",slotName:l,isShow:t.isShow,configType:t.configType,parentCol:t.parentCol,titleSlotName:"columTitleSlot"};1===t.canHide?o.push(i):n.push(i);let s=new Map;for(let n of o)s.has(n.configType)||s.set(n.configType,n);C.tabList=[...s.values()]}))})),t={tabs:a,params:e.params||[],columnTabs:o,noHiddenColumn:n}})))},S=()=>{let{columnTabs:e,noHiddenColumn:l}=t,o=e.filter((e=>1===e.isShow)),n=new Map;o.forEach((e=>{if(n.has(e.parentCol)){let l=n.get(e.parentCol);l.children.push(e),n.set(e.parentCol,l)}else n.set(e.parentCol,{title:e.parentCol,children:[e]})}));let i=0;n.forEach((e=>{i+=1,e.children?(i-=1,e.children.forEach((e=>{i+=1,e.dataIndex=`colNo${i}`,e.slotName=`colNo${i}`,e.render=({record:l})=>(0,a.Wm)("span",{innerHTML:(0,u.Z3)(l[e.dataIndex])},null)}))):(e.dataIndex=`colNo${i}`,e.slotName=`colNo${i}`)}));let s=[...l,...n.values()];x.columns=s};(0,a.wF)((()=>{N(),S(),H()}));const $=e=>{switch(e.isShow){case 0:e.isShow=1,W({type:"self",configType:e.configType,val:1});break;case 1:e.isShow=0,W({type:"self",configType:e.configType,val:0});break;default:break}},W=e=>{let{columnTabs:l,noHiddenColumn:o}=t,n=[];"self"===e.type&&l.forEach((l=>{e.configType===l.configType&&(l.isShow=e.val)}));let i=l.filter((e=>1===e.isShow)),s=new Map;i.forEach((e=>{if(s.has(e.parentCol)){let l=s.get(e.parentCol);l.children.push(e),s.set(e.parentCol,l)}else s.set(e.parentCol,{title:e.parentCol,children:[e]})}));let r=0;s.forEach((e=>{r+=1,e.children?(r-=1,e.children.forEach((e=>{r+=1,e.dataIndex=`colNo${r}`,e.slotName=`colNo${r}`,e.render=({record:l})=>(0,a.Wm)("span",{innerHTML:(0,u.Z3)(l[e.dataIndex])},null)}))):(e.dataIndex=`colNo${r}`,e.slotName=`colNo${r}`)})),n=[...o,...s.values()],x.columns=n,H()},H=()=>{x.data=[],x.loading=!0;let e=[];var l=JSON.parse(JSON.stringify(x.columns));l.forEach((l=>{"部门名称"===l.title&&e.push("deptName"),"人数累计"===l.title&&e.push("colNo1"),"营业收入累计"===l.title&&e.push("colNo2"),"销售毛利累计"!==l.title&&"销售毛利率累计"!==l.title||e.push("colNo3"),"考核经营净利润累计"!==l.title&&"考核经营净利润率累计"!==l.title||e.push("colNo4"),"招聘费用累计"===l.title&&e.push("colNo5"),"销售费用累计"===l.title&&e.push("colNo6"),"管理费用累计"===l.title&&e.push("colNo7")}));const t={dynamicHeaderParam:Array.from(new Set(e)),tagKey:"prerealComparison"};r(t).then((e=>{if("200"==e.code){let l=(0,u.th)(e.data,"key","id");x.data=l;let t=[];e.data.forEach((e=>t.push(e.id))),x.defaultExpandedKeys=t}})).catch((e=>{Message.error(e.message||"请求数据错误")})).finally((()=>{x.loading=!1}))},E=e=>{x.defaultExpandedKeys=e},T=()=>{H()},U=()=>{};return(e,l)=>{const t=(0,a.up)("a-year-picker"),n=(0,a.up)("icon-search"),i=(0,a.up)("a-button"),s=(0,a.up)("icon-refresh"),r=(0,a.up)("a-space"),u=(0,a.up)("a-tag"),g=(0,a.up)("a-tooltip"),v=(0,a.up)("a-table");return(0,a.wg)(),(0,a.iD)("div",c,[(0,a._)("div",null,[(0,a.Wm)(r,{wrap:""},{default:(0,a.w5)((()=>[d,(0,a.Wm)(t,{modelValue:k.value,"onUpdate:modelValue":l[0]||(l[0]=e=>k.value=e),disabled:"",style:{width:"120px","border-radius":"4px"},"allow-clear":!1},null,8,["modelValue"]),(0,a.Wm)(i,{type:"primary",style:{"margin-left":"16px"},onClick:T},{icon:(0,a.w5)((()=>[(0,a.Wm)(n)])),default:(0,a.w5)((()=>[(0,a.Uk)("搜索")])),_:1}),(0,a.Wm)(i,{onClick:U},{icon:(0,a.w5)((()=>[(0,a.Wm)(s)])),default:(0,a.w5)((()=>[(0,a.Uk)("重置")])),_:1})])),_:1})]),(0,a._)("div",p,[(0,a._)("div",h,[(0,a._)("div",m,[(0,a.Wm)(r,{wrap:""},{default:(0,a.w5)((()=>[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(C.tabList,((e,l)=>((0,a.wg)(),(0,a.j4)(u,{key:l,color:1===e.isShow?"arcoblue":"",size:"large",class:"pointer",onClick:l=>$(e)},{default:(0,a.w5)((()=>[(0,a.Uk)((0,o.zw)(e.configType),1)])),_:2},1032,["color","onClick"])))),128))])),_:1})])])]),(0,a._)("div",f,[(0,a.Wm)(v,{columns:x.columns,data:x.data,"column-resizable":"",scroll:{maxHeight:x.maxHeight},scrollbar:{x:!0,y:750},pagination:!1,loading:x.loading,bordered:!1,ref_key:"tableRef",ref:_,"expanded-keys":x.defaultExpandedKeys,onExpandedChange:E},{columTitleSlot:(0,a.w5)((({column:e})=>[(0,a.Wm)(g,{style:{width:"max-content"},content:e.title},{default:(0,a.w5)((()=>[(0,a._)("a",w,(0,o.zw)(e.title),1)])),_:2},1032,["content"])])),_:1},8,["columns","data","scroll","loading","expanded-keys"])])])}}};const v=g;var y=v}}]);
//# sourceMappingURL=loopAnalyze.22ff90ea.js.map