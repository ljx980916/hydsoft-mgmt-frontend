<template>
    <main ref='contentRef'>
        <div class="table-header-mask" ref="tableHeaderMaskRef"></div>
          <div ref='tableContentRef'>
            <a-table 
                :columns="props.tableProps.columns"  
                :data="props.tableProps.dataSource"  
                :loading="props.tableProps.loading"
                :pagination="props.tableProps.pagination" 
            >
                <template #thead>
                    <thead ref="theadRef"></thead>
                </template>
            </a-table>
          </div>
      </main>
  </template>
  
  
  <script setup>
  import { ref,reactive,onMounted,onBeforeUnmount, nextTick,defineExpose } from 'vue';
  import { getCurrentInstance } from "@vue/runtime-core";
  let $bus = getCurrentInstance().appContext.config.globalProperties.$bus;
  const props = defineProps({
    tableProps : {
        type : Object,
        required : true
    },
    scrollEvtName : {
        type : String,
        required : true
    },
    rootDom : {
        type : String,
        required : true
    }
  })
  const theadRef = ref(null)
  let headsWidth = []
  const contentRef = ref(null)
  let isFirstCreate = true
  const tableContentRef = ref(null)
  const tableHeaderMaskRef = ref(null)
  let rootEl = null
  onMounted(()=>{
    computedThWidth()
    rootEl = document.querySelector(props.rootDom) 
    if(rootEl)rootEl.scrollTop = 0
    let scrollContainerElTop
    nextTick(()=>{
        let getELContainerDOMRect = rootEl.getBoundingClientRect()
        scrollContainerElTop = parseFloat(getELContainerDOMRect.top)
    })
    $bus.on(props.scrollEvtName,(obj)=>{
        let domDOMRect = tableContentRef.value.getBoundingClientRect()
        let domTop = parseFloat(domDOMRect.top)
        let domBottom = parseFloat(domDOMRect.bottom)
        scrollFn(obj.scrollTop,obj.direction,domTop,scrollContainerElTop ,domBottom)
    })
  })

  function computedThWidth(){
    theadRef.value.querySelectorAll('tr th').forEach(el=>{
        let style = getComputedStyle(el)
        headsWidth.push(el.offsetWidth)
    })
  }
  let creatHeaderContainer
  let isFirstInsert = true
  let initialDomScrollTop = 0
  function scrollFn( scrollTop,direction,domTop,domContainerTop,domBottom ){
    if(direction === 'down'){
        if(isFirstCreate){
            let tableHeadEl =theadRef.value
            let cloneTableHeadEl = tableHeadEl.cloneNode(true)
                cloneTableHeadEl.querySelectorAll('tr th').forEach((el,i)=>{
                el.style.width =  headsWidth[i] + 'px'
                el.style.display = 'inline-block'
            })
            creatHeaderContainer= document.createElement('div')
            let div1 = document.createElement('div')
            creatHeaderContainer.className = '_tableHeadTopContainer '
            div1.className = '_tableHeadTopContent'
            creatHeaderContainer.appendChild(div1)
            
            div1.appendChild(cloneTableHeadEl)
            isFirstCreate = false
        }
        function scrollEvtFn(e){
            creatHeaderContainer.scrollLeft = e.target.scrollLeft
            creatHeaderContainer.parentNode.scrollLeft = e.target.scrollLeft
        }
        
        if( (domTop <= domContainerTop) && isFirstInsert){
            let tableHeadEl =theadRef.value
            initialDomScrollTop = scrollTop
            tableHeadEl.parentNode.parentNode.insertBefore(creatHeaderContainer,tableHeadEl.parentNode.parentNode.firstElementChild)
            creatHeaderContainer.scrollLeft = creatHeaderContainer.parentNode.scrollLeft
            creatHeaderContainer.addEventListener('scroll',scrollEvtFn)
            creatHeaderContainer.parentNode.addEventListener('scroll',scrollEvtFn)
            isFirstInsert = false
        }
        if(!isFirstCreate && (domTop <= domContainerTop)){
            let tableHeadEl =theadRef.value
            creatHeaderContainer.scrollLeft = tableHeadEl.parentNode.parentNode.scrollLeft
            creatHeaderContainer.style.display = 'block'
            creatHeaderContainer.style.top = domContainerTop+26  + 'px'
            tableHeaderMaskRef.value.classList.add('table-header-mask-active')
            tableHeaderMaskRef.value.style.top = domContainerTop+'px'
        }
        if( (domBottom <= domContainerTop) && creatHeaderContainer ){
            creatHeaderContainer.style.display = 'none'
            tableHeaderMaskRef.value.classList.remove('table-header-mask-active')
        }
    }
    if(direction === 'up' && creatHeaderContainer){
        if(domBottom >= domContainerTop){
            creatHeaderContainer.style.display = 'block'
            tableHeaderMaskRef.value.classList.add('table-header-mask-active')
        }
        if(domTop >= domContainerTop){
            creatHeaderContainer.style.top = domTop+26 + 'px'
            tableHeaderMaskRef.value.classList.remove('table-header-mask-active')
        }
        if(scrollTop <= initialDomScrollTop){
            creatHeaderContainer.style.display = 'none'
        }
    }
    creatHeaderContainer.style.width = contentRef.value.offsetWidth + 'px'
    tableHeaderMaskRef.value.style.width = contentRef.value.offsetWidth+2 + 'px'
  }
  defineExpose({
    computedThWidth
  })
  onBeforeUnmount(()=>{
    $bus.off(props.scrollEvtName)
  })
  </script>
  
  <style lang="scss">
._tableHeadTopContainer  {
    position : fixed;
    z-index : 100 ;
    overflow-x : auto;
}
._tableHeadTopContainer  {
  &::-webkit-scrollbar {
    height: 0;
  }
}
._tableHeadTopContent {
    width : max-content;
}

.table-header-mask{
    height: 26px;
    background-color: var(--color-bg-3);
    display: none;
}
.table-header-mask-active{
    display: block;
    position: fixed;
    width: 100%;
    z-index: 100;
}
  </style>