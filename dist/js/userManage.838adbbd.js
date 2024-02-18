"use strict";(self["webpackChunkoms_frontend"]=self["webpackChunkoms_frontend"]||[]).push([[651],{3234:function(e,a,t){t.d(a,{H4:function(){return r},Uc:function(){return o},o4:function(){return u},s2:function(){return d},wi:function(){return i},zk:function(){return n}});var l=t(4471);function n(){return(0,l.Z)({url:"/calendarEvent/fetchList",method:"get"})}function o(){return(0,l.Z)({url:"/system/role/selectRole",method:"post"})}function i(){return(0,l.Z)({url:"/calendarEvent/getDeptTree",method:"get"})}function u(e){return(0,l.Z)({url:"/calendarEvent/insertEvent",method:"post",data:e})}function d(e){return(0,l.Z)({url:"/calendarEvent/editEvent",method:"post",data:e})}function r(e){return(0,l.Z)({url:"/calendarEvent/deleteEvent",method:"delete",params:e})}},5343:function(e,a,t){t.d(a,{I6:function(){return n},g1:function(){return l},vl:function(){return o}});const l=[{title:"工号",dataIndex:"workNo"},{title:"姓名",dataIndex:"name",slotName:"name"},{title:"所属部门",dataIndex:"deptName"},{title:"邮箱",dataIndex:"email"},{title:"账户状态",dataIndex:"flag",slotName:"flag_view"},{title:"操作",dataIndex:"action",slotName:"action"}],n=[{title:"菜单名称",dataIndex:"name",key:"name",width:"20%"},{title:"图标",dataIndex:"icon",key:"icon"},{title:"类型",dataIndex:"type",key:"type",slotName:"type_view"},{title:"排序号",dataIndex:"sort",key:"sort"},{title:"URL",dataIndex:"url",key:"url"},{title:"授权标识",dataIndex:"perms",key:"perms"},{title:"操作",dataIndex:"action",key:"action",slotName:"action"}],o=[{title:"角色名称",dataIndex:"name"},{title:"备注",dataIndex:"remarks"},{title:"角色编码",dataIndex:"code"},{title:"创建时间",dataIndex:"createTime",width:200},{title:"操作",dataIndex:"action",slotName:"action"}]},729:function(e,a,t){t.d(a,{Z:function(){return y}});t(7658);var l=t(3396),n=t(7139),o=t(4870),i=t(5343),u=t(4842),d=t(4239);const r=e=>((0,l.dD)("data-v-53477c82"),e=e(),(0,l.Cn)(),e),m={class:"m-b-20"},s={class:"flex-between",style:{height:"40px"}},p={class:"tool-grid"},c={key:0},g=r((()=>(0,l._)("span",null,"只看我的",-1))),f={key:0,class:"red"},w={key:1,class:"green"};var v={__name:"tableContainer",props:{tabs:{type:Array,default:()=>[]},chekedValue:{type:String,default:""},tableColumns:{type:Array,default:()=>[]},tableData:{type:Array,default:()=>[]},menuName:{type:String,default:""},loading:{type:Boolean,default:!1},scrollY:{type:String,default:"600px"},setColumns:{type:Array,default:()=>[]},switchStatus:{type:Boolean,default:!1},exportExcel:{type:String,default:""},paginationTotal:{type:Number,default:10},paginationCurrent:{type:Number,default:1},paginationPageSize:{type:Number,default:10}},emits:["switchClick","paginationCurrentChange","paginationPageSizeChange","handleEdit","handleDeleteMenu","handleUpdateFlag","columnOK","radioChange"],setup(e,{emit:a}){const t=e,r=(0,d.Ls)().getPermission,v=(0,o.qj)({tableColumns:[{title:"自定义列1",dataIndex:"customColumn1",width:200},{title:"自定义列2",dataIndex:"customColumn2",width:200},{title:"自定义列3",dataIndex:"customColumn3",width:200},{title:"自定义列4",dataIndex:"customColumn4",width:200},{title:"自定义列5",dataIndex:"customColumn5",width:200},{title:"自定义列6",dataIndex:"customColumn6",width:200}],tableData:[]}),k=(0,o.iH)(!1),h=(0,o.iH)([]),y=(0,o.iH)([]),C=(0,o.iH)(i.g1);let N=i.g1.filter((e=>"action"!==e.dataIndex))||[];const b=()=>{k.value=!0},_=e=>{y.value=e},x=()=>{let e=JSON.parse(localStorage.getItem("userListColumns"));if(e)C.value=e,h.value=e.map((e=>e.dataIndex));else{var a=[];N.forEach((e=>{a.push(e.dataIndex),h.value=a}))}};x();const U=()=>{if(1===h.value.length&&"action"===h.value[0])return u.Z.error("至少选择一项");a("columnOK",h.value),k.value=!1},I=e=>{a("switchClick",!e)},S=e=>{a("paginationCurrentChange",e)},z=e=>{a("paginationPageSizeChange",e)},D=(e,t)=>{a("handleEdit",e,t)},q=e=>{a("handleDeleteMenu",e)},W=e=>{a("handleDetail",e)},E=e=>{a("handleUpdateFlag",e)},H=e=>{a("radioChange",e)};return(a,i)=>{const u=(0,l.up)("a-radio"),d=(0,l.up)("a-radio-group"),y=(0,l.up)("a-switch"),C=(0,l.up)("icon-download"),N=(0,l.up)("a-button"),x=(0,l.up)("icon-home"),j=(0,l.up)("a-popconfirm"),O=(0,l.up)("a-divider"),Z=(0,l.up)("a-table"),V=(0,l.up)("a-checkbox"),P=(0,l.up)("a-checkbox-group"),F=(0,l.up)("a-modal");return(0,l.wg)(),(0,l.iD)("div",null,[(0,l._)("div",null,[(0,l._)("div",m,[(0,l._)("div",s,[(0,l.Wm)(d,{type:"button",size:"large","model-value":t.chekedValue,onChange:H},{default:(0,l.w5)((()=>[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(t.tabs,(e=>((0,l.wg)(),(0,l.j4)(u,{value:e.key},{default:(0,l.w5)((()=>[(0,l.Uk)((0,n.zw)(e.name),1)])),_:2},1032,["value"])))),256))])),_:1},8,["model-value"]),(0,l.WI)(a.$slots,"default")]),(0,l._)("div",null,[(0,l._)("div",p,["USER"===t.menuName?((0,l.wg)(),(0,l.iD)("div",c,[(0,l.Wm)(y,{value:e.switchStatus,onChange:I},{checked:(0,l.w5)((()=>[(0,l.Uk)("ON")])),unchecked:(0,l.w5)((()=>[(0,l.Uk)("OFF")])),_:1},8,["value"]),g])):(0,l.kq)("",!0),"USER"===t.menuName?((0,l.wg)(),(0,l.j4)(N,{key:1,type:"primary"},{icon:(0,l.w5)((()=>[(0,l.Wm)(C)])),default:(0,l.w5)((()=>[(0,l.Uk)("导出excel")])),_:1})):(0,l.kq)("",!0),"USER"===t.menuName?((0,l.wg)(),(0,l.j4)(N,{key:2,class:"config",type:"primary",onClick:b},{icon:(0,l.w5)((()=>[(0,l.Wm)(x)])),default:(0,l.w5)((()=>[(0,l.Uk)("配置列")])),_:1})):(0,l.kq)("",!0)])])])]),(0,l._)("div",null,[(0,l.Wm)(Z,{columns:t.tableColumns.length&&t.tableColumns||v.tableColumns,data:t.tableData.length&&t.tableData||v.tableData,"column-resizable":"",bordered:!1,scroll:{x:"100%",y:t.scrollY},scrollbar:!1,loading:t.loading,pagination:{total:e.paginationTotal,current:e.paginationCurrent,pageSize:e.paginationPageSize,showTotal:!0,showPageSize:!0,showJumper:!0,onChange:S,onPageSizeChange:z}},{type_view:(0,l.w5)((({record:e})=>[(0,l._)("div",null,(0,n.zw)(0===e.type?"目录":1===e.type?"菜单":"按钮"),1)])),role_view:(0,l.w5)((({record:e})=>[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(e.roles,((e,a)=>((0,l.wg)(),(0,l.iD)("div",{key:a},(0,n.zw)(e.name),1)))),128))])),flag_view:(0,l.w5)((({record:e})=>[0===e.flag?((0,l.wg)(),(0,l.iD)("span",f,"禁用")):(0,l.kq)("",!0),1===e.flag?((0,l.wg)(),(0,l.iD)("span",w,"启用")):(0,l.kq)("",!0)])),action:(0,l.w5)((({record:e})=>[(0,l.Wm)(j,{content:"你确定要启用这个用户吗?",type:"error",onOk:a=>E(e)},{default:(0,l.w5)((()=>["user"==t.menuName&&0===e.flag?((0,l.wg)(),(0,l.j4)(N,{key:0,type:"text"},{default:(0,l.w5)((()=>[(0,l.Uk)("启用")])),_:1})):(0,l.kq)("",!0)])),_:2},1032,["onOk"]),"user"==t.menuName&&0===e.flag?((0,l.wg)(),(0,l.j4)(O,{key:0,direction:"vertical"})):(0,l.kq)("",!0),"user"==t.menuName&&0===e.flag?((0,l.wg)(),(0,l.j4)(N,{key:1,type:"text",style:{color:"#999999"}},{default:(0,l.w5)((()=>[(0,l.Uk)("禁用")])),_:1})):(0,l.kq)("",!0),"user"==t.menuName&&1===e.flag?((0,l.wg)(),(0,l.j4)(N,{key:2,type:"text",style:{color:"#999999"}},{default:(0,l.w5)((()=>[(0,l.Uk)("启用")])),_:1})):(0,l.kq)("",!0),"user"==t.menuName&&1===e.flag?((0,l.wg)(),(0,l.j4)(O,{key:3,direction:"vertical"})):(0,l.kq)("",!0),(0,l.Wm)(j,{content:"你确定要禁用这个用户吗?",type:"error",onOk:a=>E(e)},{default:(0,l.w5)((()=>["user"==t.menuName&&1===e.flag?((0,l.wg)(),(0,l.j4)(N,{key:0,type:"text"},{default:(0,l.w5)((()=>[(0,l.Uk)("禁用")])),_:1})):(0,l.kq)("",!0)])),_:2},1032,["onOk"]),"USER"==t.menuName?((0,l.wg)(),(0,l.j4)(N,{key:4,type:"text",onClick:a=>W(e,"view")},{default:(0,l.w5)((()=>[(0,l.Uk)("查看")])),_:2},1032,["onClick"])):(0,l.kq)("",!0),"user"==t.menuName?((0,l.wg)(),(0,l.j4)(O,{key:5,direction:"vertical"})):(0,l.kq)("",!0),(0,o.SU)(r).includes("menu:edit")&&"admin"!==e.code?((0,l.wg)(),(0,l.j4)(N,{key:6,type:"text",onClick:a=>D(e,"edit")},{default:(0,l.w5)((()=>[(0,l.Uk)(" 编辑 ")])),_:2},1032,["onClick"])):(0,l.kq)("",!0),"menu"==t.menuName||"role"==t.menuName&&"admin"!==e.code?((0,l.wg)(),(0,l.j4)(O,{key:7,direction:"vertical"})):(0,l.kq)("",!0),(0,l.Wm)(j,{content:"确定要删除吗?",type:"error",onOk:a=>q(e)},{default:(0,l.w5)((()=>[(0,o.SU)(r).includes("menu:delete")&&("menu"==t.menuName||"role"==t.menuName&&"admin"!==e.code)?((0,l.wg)(),(0,l.j4)(N,{key:0,type:"text"},{default:(0,l.w5)((()=>[(0,l.Uk)(" 删除 ")])),_:1})):(0,l.kq)("",!0)])),_:2},1032,["onOk"])])),_:1},8,["columns","data","scroll","loading","pagination"])]),(0,l.Wm)(F,{visible:k.value,"onUpdate:visible":i[1]||(i[1]=e=>k.value=e),title:"选择表格项"},{footer:(0,l.w5)((()=>[(0,l.Wm)(N,{type:"primary",onClick:U},{default:(0,l.w5)((()=>[(0,l.Uk)("确定")])),_:1})])),default:(0,l.w5)((()=>[(0,l.Wm)(P,{onChange:_,modelValue:h.value,"onUpdate:modelValue":i[0]||(i[0]=e=>h.value=e)},{default:(0,l.w5)((()=>[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(e.setColumns,(e=>((0,l.wg)(),(0,l.j4)(V,{key:e.dataIndex,value:e.dataIndex},{default:(0,l.w5)((()=>[(0,l.Uk)((0,n.zw)(e.title),1)])),_:2},1032,["value"])))),128))])),_:1},8,["modelValue"])])),_:1},8,["visible"])])}}},k=t(89);const h=(0,k.Z)(v,[["__scopeId","data-v-53477c82"]]);var y=h},9448:function(e,a,t){t.r(a),t.d(a,{default:function(){return N}});t(7658);var l=t(3396),n=t(4870),o=t(7139),i=t(5343),u=t(4471);function d(e){return(0,u.Z)({url:"/system/user/"+e.id,method:"get"})}function r(e){return(0,u.Z)({url:"/system/user/save",method:"post",data:e})}function m(e){return(0,u.Z)({url:"/system/user/userListPage",method:"get",params:e})}function s(e){return(0,u.Z)({url:"/system/user/updateFlag",method:"get",params:e})}function p(e){return(0,u.Z)({url:"/system/role/listShowTabRole",method:"post",data:e})}function c(e){return(0,u.Z)({url:"/system/user/getEmpByNameOrCode",method:"get",params:e})}var g=t(729),f=t(4842),w=t(3234),v=t(4239);const k={class:"defaultPadding"},h={class:"m-t-8"};var y={__name:"userView",setup(e){let a=(0,l.FN)().appContext.config.globalProperties.$bus;const t=(0,v.Ls)().getPermission,u=(0,v.eN)().getUserInfo;(0,l.wF)((()=>{a.emit("updateStructure",[{type:"text",color:"#333",msg:"账号列表"}]),O()}));const y=(0,n.iH)(!1),C=(0,n.iH)([]),N=(0,n.iH)("OMD"),b=(0,n.iH)(i.g1),_=(0,n.iH)(!1),x=(0,n.qj)({roleConfig:"OMD",roleConfig1:[],empCode:"",empName:"",deptName:"",userName:""}),U=(0,n.iH)([]),I=(0,n.iH)(null),S={x:"100%",y:600},z=(0,n.XI)([]),D=(0,n.iH)(""),q=(0,n.iH)(""),W=(0,n.iH)(""),E=(0,n.iH)([]),H=(0,n.iH)("add"),j=(0,n.qj)({loading:!1,dataSource:[],pagination:{pageNum:1,pageSize:10,total:0},menuName:"user"}),O=()=>{(0,w.Uc)().then((e=>{"200"==e.code&&(E.value=e.data)}))},Z=()=>{j.loading=!0;const e={pageNum:j.pagination.pageNum,pageSize:j.pagination.pageSize,roleCode:N.value};m(e).then((e=>{"000000000000"===e.code&&(e.data.list.forEach(((e,a)=>{e.key=a})),j.pagination.total=parseInt(e.data.total),j.dataSource=e.data.list),j.loading=!1}))};Z();const V=()=>{_.value=!0,D.value="",q.value="新建账号",I.value.resetFields(),x.roleConfig1=[],W.value="",H.value="add","OMD"===N.value?x.roleConfig="OMD":x.roleConfig="admin",-1!=u.roles.indexOf("admin")?y.value=!0:y.value=!1},P=e=>{const a={userId:e.id,flag:1==e.flag?0:1};s(a).then((e=>{"000000000000"===e.code?(f.Z.success("操作成功"),Z()):f.Z.error(e.message)}))},F=e=>{j.pagination.pageNum=e,Z()},R=e=>{j.pagination.pageSize=e,Z()},M=e=>{N.value=e,x.roleConfig=e,Z()},T=(e,a)=>{U.value=[],x.roleConfig1=[],_.value=!0,H.value="update",-1!=u.roles.indexOf("admin")?y.value=!0:y.value=!1,d({id:e.id}).then((e=>{const{data:a,code:t}=e;"000000000000"===t&&(x.empName=`${a.name}`,x.empCode=a.workNo,x.deptName=a.deptName,x.userName=a.userName,a.roles.forEach((e=>{-1===x.roleConfig1.indexOf(e.id)&&x.roleConfig1.push(e.id)})))})),D.value=a,q.value="编辑账号",W.value=e.id},K=e=>{c(e).then((e=>{"000000000000"==e.code&&(z.value=e.data)}))},L=e=>{I.value.resetFields();const a={empName:e,empCode:x.empCode};K(a)},Y=e=>{x.empName=e,z.value.forEach((a=>{-1!==e.indexOf(a.empCode)&&(x.empCode=a.empCode,x.deptName=a.deptName,x.userName=a.empEmail.slice(0,a.empEmail.indexOf("@")))}))},A=e=>z.value.filter((a=>a.empCode===e))[0]||{},B=()=>{_.value=!1},$=e=>e.map((e=>({id:e}))),J=(e,a)=>{x.roleConfig==e&&E.value.forEach((e=>{e.code==a&&U.value.push({id:e.id})}))},X=()=>{I.value.validate((e=>{if(!e){_.value=!1,y.value||(J("OMD","OMD"),J("admin","admin"));let e="新建账号"===q.value?A(x.empCode).empName:x.empName;const a={id:W.value,name:e,workNo:x.empCode,deptName:x.deptName,roles:y.value?$(x.roleConfig1):U.value,roleCode:N.value,userName:x.userName||x.empName};r(a).then((e=>{"000000000000"===e.code?(f.Z.success("操作成功"),Z()):f.Z.error(e.message)})).catch((e=>{f.Z.error(e.message||"数据请求失败")}))}}))},G=()=>{p().then((e=>{"000000000000"===e.code?C.value=e.data.map((e=>({key:e.code,name:e.name}))):f.Z.error(e.message)})).catch((e=>{f.Z.error(e.message||"数据请求失败")}))};return G(),(e,a)=>{const i=(0,l.up)("icon-plus"),u=(0,l.up)("a-button"),d=(0,l.up)("a-option"),r=(0,l.up)("a-select"),m=(0,l.up)("a-form-item"),s=(0,l.up)("a-input"),p=(0,l.up)("a-form"),c=(0,l.up)("a-modal");return(0,l.wg)(),(0,l.iD)("div",k,[(0,l.Wm)(g.Z,{class:"m-t-20","column-resizable":"",scroll:S,scrollbar:!1,paginationTotal:j.pagination.total,paginationPageSize:j.pagination.pageSize,paginationCurrent:j.pagination.pageNum,loading:j.loading,tableColumns:b.value,"table-data":j.dataSource,"menu-name":j.menuName,tabs:C.value,chekedValue:N.value,onHandleEdit:T,onRadioChange:M,onHandleUpdateFlag:P,onPaginationCurrentChange:F,onPaginationPageSizeChange:R},{default:(0,l.w5)((()=>[(0,n.SU)(t).includes("user:add")?((0,l.wg)(),(0,l.j4)(u,{key:0,type:"primary",onClick:a[0]||(a[0]=e=>V())},{icon:(0,l.w5)((()=>[(0,l.Wm)(i)])),default:(0,l.w5)((()=>[(0,l.Uk)("新建账号")])),_:1})):(0,l.kq)("",!0)])),_:1},8,["paginationTotal","paginationPageSize","paginationCurrent","loading","tableColumns","table-data","menu-name","tabs","chekedValue"]),(0,l.Wm)(c,{visible:_.value,"onUpdate:visible":a[5]||(a[5]=e=>_.value=e),title:q.value,"title-align":"start",width:"680px"},{footer:(0,l.w5)((()=>[(0,l.Wm)(u,{onClick:B},{default:(0,l.w5)((()=>[(0,l.Uk)("取消")])),_:1}),(0,l.Wm)(u,{type:"primary",onClick:X},{default:(0,l.w5)((()=>[(0,l.Uk)("确定")])),_:1})])),default:(0,l.w5)((()=>[(0,l.Wm)(p,{ref_key:"formRef",ref:I,mask:!0,model:x,"auto-label-width":"",style:{width:"580px",marginLeft:"20px"}},{default:(0,l.w5)((()=>[(0,l.Wm)(m,{field:"empName",label:"员工姓名",rules:[{required:!0,message:"请输入员工姓名"}]},{default:(0,l.w5)((()=>[(0,l.Wm)(r,{modelValue:x.empName,"onUpdate:modelValue":a[1]||(a[1]=e=>x.empName=e),placeholder:"请输入","filter-option":!1,"allow-search":"",disabled:"update"===H.value,onSearch:L,onChange:Y},{default:(0,l.w5)((()=>[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)((0,n.SU)(z),((e,a)=>((0,l.wg)(),(0,l.j4)(d,{value:e.empCode,label:e.empName,key:a},{default:(0,l.w5)((()=>[(0,l.Uk)((0,o.zw)(e.empName)+"  ("+(0,o.zw)(e.empCode)+"，"+(0,o.zw)(e.deptName)+") ",1)])),_:2},1032,["value","label"])))),128))])),_:1},8,["modelValue","disabled"])])),_:1}),(0,l.Wm)(m,{field:"empCode",label:"员工工号",rules:[{required:!0,message:"请输入员工工号"}]},{default:(0,l.w5)((()=>[(0,l.Wm)(s,{modelValue:x.empCode,"onUpdate:modelValue":a[2]||(a[2]=e=>x.empCode=e),placeholder:"请输入",disabled:""},null,8,["modelValue"])])),_:1}),(0,l.Wm)(m,{field:"deptName",label:"部门名称",disabled:"",rules:[{required:!0,message:"请输入部门名称"}]},{default:(0,l.w5)((()=>[(0,l.Wm)(s,{modelValue:x.deptName,"onUpdate:modelValue":a[3]||(a[3]=e=>x.deptName=e),placeholder:"请输入",disabled:"update"===H.value},null,8,["modelValue","disabled"])])),_:1}),y.value?((0,l.wg)(),(0,l.j4)(m,{key:0,field:"roleConfig1",label:"角色",rules:[{required:!0,message:"请输入角色设置"}]},{default:(0,l.w5)((()=>[(0,l.Wm)(r,{modelValue:x.roleConfig1,"onUpdate:modelValue":a[4]||(a[4]=e=>x.roleConfig1=e),placeholder:"请输入",multiple:"","allow-search":""},{default:(0,l.w5)((()=>[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(E.value,(e=>((0,l.wg)(),(0,l.j4)(d,{value:e.id,key:e.id},{default:(0,l.w5)((()=>[(0,l.Uk)((0,o.zw)(e.name),1)])),_:2},1032,["value"])))),128))])),_:1},8,["modelValue"])])),_:1})):((0,l.wg)(),(0,l.j4)(m,{key:1,field:"roleConfig",label:"角色",rules:[{required:!0,message:"请选择角色设置"}]},{default:(0,l.w5)((()=>[(0,l._)("span",h,(0,o.zw)(x.roleConfig),1)])),_:1}))])),_:1},8,["model"])])),_:1},8,["visible","title"])])}}};const C=y;var N=C}}]);
//# sourceMappingURL=userManage.838adbbd.js.map