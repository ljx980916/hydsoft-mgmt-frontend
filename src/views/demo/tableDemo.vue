<template>
    <div class="defaultPadding">
        <tableContainer>
            <!-- <a-button type="dashed" status="success">Dashed</a-button>
            <a-button type="outline" status="success">Outline</a-button>
            <a-button type="primary" status="success" disabled>Primary</a-button>
            <a-button type="primary" status="success">Primary</a-button>
            <a-button status="success">Default</a-button> -->
            <!-- <div>
                <a-switch >
                    <template #checked>
                        ON
                    </template>
                    <template #unchecked>
                        OFF
                    </template>
                </a-switch>
                <span>
                    只看我的
                </span>
            </div>
            <a-button type="primary">
                <template #icon>
                    <icon-download />
                </template>
                <template #default>
                    导出excel
                </template>
            </a-button>
            <a-button type="outline">
                <template #icon>
                    <icon-home />
                </template>
                <template #default>
                    配置列
                </template>
            </a-button> -->
            <div v-for="item,index of btnGroup" :key="index" class="m-b-10">
                <div class="m-b-10">
                    <a-select v-model:model-value ="item.select.value" style="width:100px;" class="m-b-10">
                        <a-option :value="option.value" v-for="option,optionIndex of item.select.options" :key="optionIndex">{{ option.direction }}</a-option>
                    </a-select>
                    <div class="btnsContainer" :style="{'justify-content': item.select.value}">
                        <a-button 
                            :type="btn.type" 
                            :loading="btn.loading" 
                            :disabled="btn.disabled" 
                            v-for="btn,btnIndex of item.btns" 
                            :key="btnIndex"
                            :style="{'margin': btn.margin}"
                        >
                            {{ btn.text }}
                        </a-button>
                    </div>
                </div>
            </div>
        </tableContainer>

        <div class="container">
            <div class="item">1</div>
            <div class="item">2</div>
            <div class="item">3</div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import tableContainer from '../../components/tableContainer'

const btnGroup = ref([
        {
            select: {
                value : 'flex-start',
                options : [
                    {
                        direction: '左对齐',
                        value: 'flex-start'
                    },
                    {
                        direction: '右对齐',
                        value: 'flex-end'
                    },
                    {
                        direction: '居中',
                        value: 'center'
                    },
                    {
                        direction: '两端对齐',
                        value: 'space-between'
                    },
                    {
                        direction: '分散对齐',
                        value: 'space-around'
                    },
                ]
            },
            btns: [
                {
                    text: '按钮1',
                    type: 'primary',
                    disabled: false,
                    loading: false,
                    margin : '0 10px 0 0'
                },
                {
                    text: '按钮2',
                    type: 'primary',
                    disabled: false,
                    loading: false,
                    margin : '0 10px'
                },
            ]
        },
        {
            select: {
                value : 'flex-start',
                options : [
                    {
                        direction: '左对齐',
                        value: 'flex-start'
                    },
                    {
                        direction: '右对齐',
                        value: 'flex-end'
                    },
                    {
                        direction: '居中',
                        value: 'center'
                    },
                    {
                        direction: '两端对齐',
                        value: 'space-between'
                    },
                    {
                        direction: '分散对齐',
                        value: 'space-around'
                    },
                ]
            },
            btns: [
                {
                    text: '按钮1',
                    type: 'primary',
                    disabled: false,
                    loading: false,
                    margin : '0 10px 0 0'
                },
                {
                    text: '按钮2',
                    type: 'primary',
                    disabled: false,
                    loading: false,
                    margin : '0 10px'
                },
            ]
        }
])
</script>

<style lang="scss" scoped>
.btnsContainer{
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
}
</style>