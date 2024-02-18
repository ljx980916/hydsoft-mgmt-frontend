"use strict";(self["webpackChunkoms_frontend"]=self["webpackChunkoms_frontend"]||[]).push([[796],{5343:function(e,a,t){t.d(a,{I6:function(){return n},g1:function(){return l},vl:function(){return o}});const l=[{title:"工号",dataIndex:"workNo"},{title:"姓名",dataIndex:"name",slotName:"name"},{title:"所属部门",dataIndex:"deptName"},{title:"邮箱",dataIndex:"email"},{title:"账户状态",dataIndex:"flag",slotName:"flag_view"},{title:"操作",dataIndex:"action",slotName:"action"}],n=[{title:"菜单名称",dataIndex:"name",key:"name",width:"20%"},{title:"图标",dataIndex:"icon",key:"icon"},{title:"类型",dataIndex:"type",key:"type",slotName:"type_view"},{title:"排序号",dataIndex:"sort",key:"sort"},{title:"URL",dataIndex:"url",key:"url"},{title:"授权标识",dataIndex:"perms",key:"perms"},{title:"操作",dataIndex:"action",key:"action",slotName:"action"}],o=[{title:"角色名称",dataIndex:"name"},{title:"备注",dataIndex:"remarks"},{title:"角色编码",dataIndex:"code"},{title:"创建时间",dataIndex:"createTime",width:200},{title:"操作",dataIndex:"action",slotName:"action"}]},729:function(e,a,t){t.d(a,{Z:function(){return v}});t(7658);var l=t(3396),n=t(7139),o=t(4870),u=t(5343),i=t(4842),d=t(4239);const r=e=>((0,l.dD)("data-v-53477c82"),e=e(),(0,l.Cn)(),e),m={class:"m-b-20"},c={class:"flex-between",style:{height:"40px"}},s={class:"tool-grid"},p={key:0},g=r((()=>(0,l._)("span",null,"只看我的",-1))),w={key:0,class:"red"},f={key:1,class:"green"};var k={__name:"tableContainer",props:{tabs:{type:Array,default:()=>[]},chekedValue:{type:String,default:""},tableColumns:{type:Array,default:()=>[]},tableData:{type:Array,default:()=>[]},menuName:{type:String,default:""},loading:{type:Boolean,default:!1},scrollY:{type:String,default:"600px"},setColumns:{type:Array,default:()=>[]},switchStatus:{type:Boolean,default:!1},exportExcel:{type:String,default:""},paginationTotal:{type:Number,default:10},paginationCurrent:{type:Number,default:1},paginationPageSize:{type:Number,default:10}},emits:["switchClick","paginationCurrentChange","paginationPageSizeChange","handleEdit","handleDeleteMenu","handleUpdateFlag","columnOK","radioChange"],setup(e,{emit:a}){const t=e,r=(0,d.Ls)().getPermission,k=(0,o.qj)({tableColumns:[{title:"自定义列1",dataIndex:"customColumn1",width:200},{title:"自定义列2",dataIndex:"customColumn2",width:200},{title:"自定义列3",dataIndex:"customColumn3",width:200},{title:"自定义列4",dataIndex:"customColumn4",width:200},{title:"自定义列5",dataIndex:"customColumn5",width:200},{title:"自定义列6",dataIndex:"customColumn6",width:200}],tableData:[]}),y=(0,o.iH)(!1),h=(0,o.iH)([]),v=(0,o.iH)([]),_=(0,o.iH)(u.g1);let b=u.g1.filter((e=>"action"!==e.dataIndex))||[];const x=()=>{y.value=!0},C=e=>{v.value=e},I=()=>{let e=JSON.parse(localStorage.getItem("userListColumns"));if(e)_.value=e,h.value=e.map((e=>e.dataIndex));else{var a=[];b.forEach((e=>{a.push(e.dataIndex),h.value=a}))}};I();const U=()=>{if(1===h.value.length&&"action"===h.value[0])return i.Z.error("至少选择一项");a("columnOK",h.value),y.value=!1},N=e=>{a("switchClick",!e)},S=e=>{a("paginationCurrentChange",e)},W=e=>{a("paginationPageSizeChange",e)},V=(e,t)=>{a("handleEdit",e,t)},q=e=>{a("handleDeleteMenu",e)},z=e=>{a("handleDetail",e)},j=e=>{a("handleUpdateFlag",e)},D=e=>{a("radioChange",e)};return(a,u)=>{const i=(0,l.up)("a-radio"),d=(0,l.up)("a-radio-group"),v=(0,l.up)("a-switch"),_=(0,l.up)("icon-download"),b=(0,l.up)("a-button"),I=(0,l.up)("icon-home"),P=(0,l.up)("a-popconfirm"),E=(0,l.up)("a-divider"),H=(0,l.up)("a-table"),O=(0,l.up)("a-checkbox"),Z=(0,l.up)("a-checkbox-group"),M=(0,l.up)("a-modal");return(0,l.wg)(),(0,l.iD)("div",null,[(0,l._)("div",null,[(0,l._)("div",m,[(0,l._)("div",c,[(0,l.Wm)(d,{type:"button",size:"large","model-value":t.chekedValue,onChange:D},{default:(0,l.w5)((()=>[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(t.tabs,(e=>((0,l.wg)(),(0,l.j4)(i,{value:e.key},{default:(0,l.w5)((()=>[(0,l.Uk)((0,n.zw)(e.name),1)])),_:2},1032,["value"])))),256))])),_:1},8,["model-value"]),(0,l.WI)(a.$slots,"default")]),(0,l._)("div",null,[(0,l._)("div",s,["USER"===t.menuName?((0,l.wg)(),(0,l.iD)("div",p,[(0,l.Wm)(v,{value:e.switchStatus,onChange:N},{checked:(0,l.w5)((()=>[(0,l.Uk)("ON")])),unchecked:(0,l.w5)((()=>[(0,l.Uk)("OFF")])),_:1},8,["value"]),g])):(0,l.kq)("",!0),"USER"===t.menuName?((0,l.wg)(),(0,l.j4)(b,{key:1,type:"primary"},{icon:(0,l.w5)((()=>[(0,l.Wm)(_)])),default:(0,l.w5)((()=>[(0,l.Uk)("导出excel")])),_:1})):(0,l.kq)("",!0),"USER"===t.menuName?((0,l.wg)(),(0,l.j4)(b,{key:2,class:"config",type:"primary",onClick:x},{icon:(0,l.w5)((()=>[(0,l.Wm)(I)])),default:(0,l.w5)((()=>[(0,l.Uk)("配置列")])),_:1})):(0,l.kq)("",!0)])])])]),(0,l._)("div",null,[(0,l.Wm)(H,{columns:t.tableColumns.length&&t.tableColumns||k.tableColumns,data:t.tableData.length&&t.tableData||k.tableData,"column-resizable":"",bordered:!1,scroll:{x:"100%",y:t.scrollY},scrollbar:!1,loading:t.loading,pagination:{total:e.paginationTotal,current:e.paginationCurrent,pageSize:e.paginationPageSize,showTotal:!0,showPageSize:!0,showJumper:!0,onChange:S,onPageSizeChange:W}},{type_view:(0,l.w5)((({record:e})=>[(0,l._)("div",null,(0,n.zw)(0===e.type?"目录":1===e.type?"菜单":"按钮"),1)])),role_view:(0,l.w5)((({record:e})=>[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(e.roles,((e,a)=>((0,l.wg)(),(0,l.iD)("div",{key:a},(0,n.zw)(e.name),1)))),128))])),flag_view:(0,l.w5)((({record:e})=>[0===e.flag?((0,l.wg)(),(0,l.iD)("span",w,"禁用")):(0,l.kq)("",!0),1===e.flag?((0,l.wg)(),(0,l.iD)("span",f,"启用")):(0,l.kq)("",!0)])),action:(0,l.w5)((({record:e})=>[(0,l.Wm)(P,{content:"你确定要启用这个用户吗?",type:"error",onOk:a=>j(e)},{default:(0,l.w5)((()=>["user"==t.menuName&&0===e.flag?((0,l.wg)(),(0,l.j4)(b,{key:0,type:"text"},{default:(0,l.w5)((()=>[(0,l.Uk)("启用")])),_:1})):(0,l.kq)("",!0)])),_:2},1032,["onOk"]),"user"==t.menuName&&0===e.flag?((0,l.wg)(),(0,l.j4)(E,{key:0,direction:"vertical"})):(0,l.kq)("",!0),"user"==t.menuName&&0===e.flag?((0,l.wg)(),(0,l.j4)(b,{key:1,type:"text",style:{color:"#999999"}},{default:(0,l.w5)((()=>[(0,l.Uk)("禁用")])),_:1})):(0,l.kq)("",!0),"user"==t.menuName&&1===e.flag?((0,l.wg)(),(0,l.j4)(b,{key:2,type:"text",style:{color:"#999999"}},{default:(0,l.w5)((()=>[(0,l.Uk)("启用")])),_:1})):(0,l.kq)("",!0),"user"==t.menuName&&1===e.flag?((0,l.wg)(),(0,l.j4)(E,{key:3,direction:"vertical"})):(0,l.kq)("",!0),(0,l.Wm)(P,{content:"你确定要禁用这个用户吗?",type:"error",onOk:a=>j(e)},{default:(0,l.w5)((()=>["user"==t.menuName&&1===e.flag?((0,l.wg)(),(0,l.j4)(b,{key:0,type:"text"},{default:(0,l.w5)((()=>[(0,l.Uk)("禁用")])),_:1})):(0,l.kq)("",!0)])),_:2},1032,["onOk"]),"USER"==t.menuName?((0,l.wg)(),(0,l.j4)(b,{key:4,type:"text",onClick:a=>z(e,"view")},{default:(0,l.w5)((()=>[(0,l.Uk)("查看")])),_:2},1032,["onClick"])):(0,l.kq)("",!0),"user"==t.menuName?((0,l.wg)(),(0,l.j4)(E,{key:5,direction:"vertical"})):(0,l.kq)("",!0),(0,o.SU)(r).includes("menu:edit")&&"admin"!==e.code?((0,l.wg)(),(0,l.j4)(b,{key:6,type:"text",onClick:a=>V(e,"edit")},{default:(0,l.w5)((()=>[(0,l.Uk)(" 编辑 ")])),_:2},1032,["onClick"])):(0,l.kq)("",!0),"menu"==t.menuName||"role"==t.menuName&&"admin"!==e.code?((0,l.wg)(),(0,l.j4)(E,{key:7,direction:"vertical"})):(0,l.kq)("",!0),(0,l.Wm)(P,{content:"确定要删除吗?",type:"error",onOk:a=>q(e)},{default:(0,l.w5)((()=>[(0,o.SU)(r).includes("menu:delete")&&("menu"==t.menuName||"role"==t.menuName&&"admin"!==e.code)?((0,l.wg)(),(0,l.j4)(b,{key:0,type:"text"},{default:(0,l.w5)((()=>[(0,l.Uk)(" 删除 ")])),_:1})):(0,l.kq)("",!0)])),_:2},1032,["onOk"])])),_:1},8,["columns","data","scroll","loading","pagination"])]),(0,l.Wm)(M,{visible:y.value,"onUpdate:visible":u[1]||(u[1]=e=>y.value=e),title:"选择表格项"},{footer:(0,l.w5)((()=>[(0,l.Wm)(b,{type:"primary",onClick:U},{default:(0,l.w5)((()=>[(0,l.Uk)("确定")])),_:1})])),default:(0,l.w5)((()=>[(0,l.Wm)(Z,{onChange:C,modelValue:h.value,"onUpdate:modelValue":u[0]||(u[0]=e=>h.value=e)},{default:(0,l.w5)((()=>[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(e.setColumns,(e=>((0,l.wg)(),(0,l.j4)(O,{key:e.dataIndex,value:e.dataIndex},{default:(0,l.w5)((()=>[(0,l.Uk)((0,n.zw)(e.title),1)])),_:2},1032,["value"])))),128))])),_:1},8,["modelValue"])])),_:1},8,["visible"])])}}},y=t(89);const h=(0,y.Z)(k,[["__scopeId","data-v-53477c82"]]);var v=h},900:function(e,a,t){t.r(a),t.d(a,{default:function(){return p}});t(7658);var l=t(3396),n=t(4870),o=t(4239),u=t(5343),i=t(7981),d=t(4842),r=t(729);const m={class:"defaultPadding"};var c={__name:"menuManage",setup(e){let a=(0,l.FN)().appContext.config.globalProperties.$bus;const t=(0,o.Ls)(),c=t.getPermission;(0,l.wF)((()=>{a.emit("updateStructure",[{type:"text",color:"#333",msg:"菜单列表"}])}));const s=(0,n.qj)({columns:u.I6,dataSource:[],loading:!1,pagination:{pageNum:1,pageSize:10,total:0},menuName:"menu"}),p=(0,n.iH)(!1),g=(0,n.qj)({type:"",name:"",parentId:"",url:"",perms:"",sort:void 0,icon:""}),w=(0,n.iH)(""),f=(0,n.iH)([]),k=e=>{const a=[];return e.forEach((e=>{let t={label:e.name,value:e.id};e.children&&e.children.length?(t.children=k(e.children),a.push(t)):a.push(t)})),a},y=()=>{(0,i.pb)().then((e=>{if("000000000000"===e.code){let a=[];e.data.forEach((t=>{t.children=[],t.key=t.id,"000000"===t.parentId&&a.push(t),e.data.forEach((e=>{e.parentId===t.id&&t.children.push(e)}))})),s.dataSource=a,s.pagination.total=Number(s.dataSource.length),f.value=[{label:"一级菜单",value:"000000",children:k(a.slice())}]}}))};y();const h=e=>{s.pagination.pageNum=e,y()},v=e=>{s.pagination.pageSize=e,y()},_=()=>{p.value=!0,g.type="",g.name="",g.parentId="",g.url="",g.perms="",g.sort=void 0,g.icon=""},b=e=>{p.value=!0,w.value=e.id,g.type=e.type,g.name=e.name,g.parentId=e.parentId,g.url=e.url,g.perms=e.perms,g.sort=e.sort,g.icon=e.icon},x=e=>{(0,i.yo)(e).then((e=>{"000000000000"===e.code?(d.Z.success("删除成功"),y(),a.emit("updateMenu"),t.menuSideBar().then((()=>{d.Z.success("菜单已更新")}))):d.Z.error(e.message)}))},C=()=>{let e=(0,n.IU)(g);e.id=w.value,""===w.value?(0,i.$8)(e).then((e=>{"000000000000"===e.code?(d.Z.success("新建成功!"),y(),a.emit("updateMenu")):d.Z.error(e.message)})):((0,i._2)(e).then((e=>{"000000000000"===e.code?(d.Z.success("更新成功!"),y(),a.emit("updateMenu")):d.Z.error(e.message)})),w.value=""),t.menuSideBar().then((()=>{d.Z.success("菜单已更新")}))};return(e,a)=>{const t=(0,l.up)("icon-plus"),o=(0,l.up)("a-button"),u=(0,l.up)("a-radio"),i=(0,l.up)("a-radio-group"),d=(0,l.up)("a-form-item"),w=(0,l.up)("a-input"),k=(0,l.up)("a-cascader"),y=(0,l.up)("a-input-number"),I=(0,l.up)("a-form"),U=(0,l.up)("a-modal");return(0,l.wg)(),(0,l.iD)("div",m,[(0,n.SU)(c).includes("menu:add")?((0,l.wg)(),(0,l.j4)(o,{key:0,type:"primary",onClick:_},{icon:(0,l.w5)((()=>[(0,l.Wm)(t)])),default:(0,l.w5)((()=>[(0,l.Uk)("添加菜单")])),_:1})):(0,l.kq)("",!0),(0,l.Wm)(r.Z,{class:"m-t-20","column-resizable":"",scroll:{y:600},scrollbar:!1,paginationTotal:s.pagination.total,paginationPageSize:s.pagination.pageSize,paginationCurrent:s.pagination.pageNum,loading:s.loading,tableColumns:s.columns,"table-data":s.dataSource,"menu-name":s.menuName,onHandleEdit:b,onHandleDeleteMenu:x,onPaginationCurrentChange:h,onPaginationPageSizeChange:v},null,8,["paginationTotal","paginationPageSize","paginationCurrent","loading","tableColumns","table-data","menu-name"]),(0,l.Wm)(U,{mask:!0,visible:p.value,"onUpdate:visible":a[7]||(a[7]=e=>p.value=e),title:"添加菜单",onOk:C},{default:(0,l.w5)((()=>[(0,l.Wm)(I,{model:g},{default:(0,l.w5)((()=>[(0,l.Wm)(d,{field:"类型",label:"类型"},{default:(0,l.w5)((()=>[(0,l.Wm)(i,{modelValue:g.type,"onUpdate:modelValue":a[0]||(a[0]=e=>g.type=e)},{default:(0,l.w5)((()=>[(0,l.Wm)(u,{value:0},{default:(0,l.w5)((()=>[(0,l.Uk)("目录")])),_:1}),(0,l.Wm)(u,{value:1},{default:(0,l.w5)((()=>[(0,l.Uk)("菜单")])),_:1}),(0,l.Wm)(u,{value:2},{default:(0,l.w5)((()=>[(0,l.Uk)("按钮")])),_:1})])),_:1},8,["modelValue"])])),_:1}),(0,l.Wm)(d,{field:"菜单名称",label:"菜单名称"},{default:(0,l.w5)((()=>[(0,l.Wm)(w,{type:"text",placeholder:"请输入菜单名称",modelValue:g.name,"onUpdate:modelValue":a[1]||(a[1]=e=>g.name=e)},null,8,["modelValue"])])),_:1}),(0,l.Wm)(d,{field:"上级菜单",label:"上级菜单"},{default:(0,l.w5)((()=>[(0,l.Wm)(k,{modelValue:g.parentId,"onUpdate:modelValue":a[2]||(a[2]=e=>g.parentId=e),options:f.value,expandTrigger:"hover","check-strictly":"",placeholder:"请选择上级菜单"},null,8,["modelValue","options"])])),_:1}),(0,l.Wm)(d,{field:"菜单URL",label:"菜单URL"},{default:(0,l.w5)((()=>[(0,l.Wm)(w,{type:"text",placeholder:"请输入菜单路径",modelValue:g.url,"onUpdate:modelValue":a[3]||(a[3]=e=>g.url=e)},null,8,["modelValue"])])),_:1}),(0,l.Wm)(d,{field:"授权标识",label:"授权标识"},{default:(0,l.w5)((()=>[(0,l.Wm)(w,{type:"text",placeholder:"请输入授权标识",modelValue:g.perms,"onUpdate:modelValue":a[4]||(a[4]=e=>g.perms=e)},null,8,["modelValue"])])),_:1}),(0,l.Wm)(d,{field:"排序号",label:"排序号"},{default:(0,l.w5)((()=>[(0,l.Wm)(y,{placeholder:"请输入排序号",modelValue:g.sort,"onUpdate:modelValue":a[5]||(a[5]=e=>g.sort=e)},null,8,["modelValue"])])),_:1}),(0,l.Wm)(d,{field:"图标",label:"图标"},{default:(0,l.w5)((()=>[(0,l.Wm)(w,{type:"text",placeholder:"请输入图标",modelValue:g.icon,"onUpdate:modelValue":a[6]||(a[6]=e=>g.icon=e)},null,8,["modelValue"])])),_:1})])),_:1},8,["model"])])),_:1},8,["visible"])])}}};const s=c;var p=s}}]);
//# sourceMappingURL=menuManage.90c24539.js.map