<template>
    <div>
        <div 
            v-for="(item,index) of config" 
            :key="index" 
            class="flex" 
            :style="{justifyContent:item.align}"

        >
            <div v-for="(jtem,i) of item.children" :key="i" :style="jtem.cssProperties">
                {{ jtem.component }}
                <!-- <component :is="jtem.component"></component> -->
            </div>
        </div>
    </div>
</template>

<script setup>
import { readonly } from 'vue';

const config = readonly([
    {
        align : 'space-around',
        children : [
            {
                component : 'aaa1',
                cssProperties : {
                    order : 1,
                    margin : '10px 10px 0 0',
                }
            },
            {
                component : 'aaa2',
                cssProperties : {
                    order : 2,
                    marginRight : '10px',
                }
            },
            {
                component : 'aaa3',
                cssProperties : {
                    order : 3,
                }
            },
        ]
    },
    {
        align : 'flex-start',
        children : [
            {
                component : 'aaa1',
                cssProperties : {
                    order : 1,
                    marginRight : '10px',
                }
            },
            {
                component : 'aaa2',
                cssProperties : {
                    order : 3,
                    marginRight : '10px',
                }
            },
            {
                component : 'aaa3',
                cssProperties : {
                    order : 2,
                    marginRight : '10px',
                }
            },
        ]
    },
])
</script>

<style lang="scss" scoped>

</style>