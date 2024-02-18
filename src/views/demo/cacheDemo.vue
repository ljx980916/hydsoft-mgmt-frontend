<template>
    <div class="defaultPadding">
        <div class="m-b-20">
            <a-radio-group type="button" v-model:model-value="storageSwitchVal" @change="storageSwitchValChange">
                <a-radio value="localStorage">localStorage</a-radio>
                <a-radio value="sessionStorage">sessionStorage</a-radio>
            </a-radio-group>
        </div>
        <ul class="localStorage-container" v-if="storageSwitchVal === 'localStorage'">
            <li class="flex-between" v-for="item of localStorageList">
                <div>
                    {{ item[0] }}
                </div>
                <div>
                    {{ item[1] }}
                </div>
                <div>
                    <a-button type="primary" @click="handleStorageDelete(item[0])">删除</a-button>
                </div>
            </li>
        </ul>
        <ul class="localStorage-container" v-if="storageSwitchVal === 'sessionStorage'">
            <li class="flex-between" v-for="item of localStorageList">
                <div>
                    {{ item[0] }}
                </div>
                <div>
                    {{ item[1] }}
                </div>
                <div>
                    <a-button type="primary" @click="handleStorageDelete(item[0])">删除</a-button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const localStorageList = ref(Object.entries(localStorage))
const storageSwitchVal = ref('localStorage')
const storageSwitchValChange = val=>{
    localStorageList.value = val === 'localStorage'? Object.entries(localStorage) : Object.entries(sessionStorage)
}
const handleStorageDelete = key=>{
    if(storageSwitchVal.value === 'localStorage'){
        localStorage.removeItem(key)
        localStorageList.value = Object.entries(localStorage)
    }else {
        sessionStorage.removeItem(key)
        localStorageList.value = Object.entries(sessionStorage)
    }
}

</script>

<style lang="scss" scoped>
ul{
    padding: 0;
    margin: 0;
}
.localStorage-container{
    display: grid;
    grid-template-columns: repeat(2,1fr);
    grid-template-rows: 40px;
    line-height: 40px;
    li{
        background-image: repeating-linear-gradient(45deg,purple,grey 100px);
        margin-right: 10px;
        border-radius: 10px;
        padding: 0 10px;
        color: white;
    }
}
</style>