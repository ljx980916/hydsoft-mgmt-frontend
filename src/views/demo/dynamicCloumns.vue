<template>
    <div class="defaultPadding">
        <a-table :columns="tableInfo.columns" :data="tableInfo.data" style="margin-top: 20px">
            <template #name="{ record, rowIndex }">
            <a-input v-model="record.name" @focus="cellInputFocus" @blur="cellInputBlur"/>
            </template>
            <template #province="{ record,rowIndex }">
            <a-select v-model="record.province" @change="()=>{record.city=''}">
                <a-option v-for="value of Object.keys(options)">{{value}}</a-option>
            </a-select>
            </template>
            <template #[item.slotName]="{ record,rowIndex }" v-for="item,index of toggleColumns">
              <a-input v-model="record.dataIndex" :key="index"/>
            </template>
            <template #city="{ record,rowIndex }">
            <a-select :options="options[record.province] || []" v-model="record.city" />
            </template>
        </a-table>
    </div>
</template>

<script setup>
import { onMounted, reactive,watch } from 'vue'
const options = {
      Beijing: ['Haidian', 'Chaoyang', 'Changping'],
      Sichuan: ['Chengdu', 'Mianyang', 'Aba'],
      Guangdong: ['Guangzhou', 'Shenzhen', 'Shantou']
    }
const toggleColumns = [
  {
    title: '动态列一',
    dataIndex: 'columnsOne',
    slotName: 'columnsOne'
  },
  {
    title: '动态列二',
    dataIndex: 'columnTwo',
    slotName: 'columnTwo'
  },
  {
    title: '动态列三',
    dataIndex: 'columnThree',
    slotName: 'columnThree'
  },
]

    const tableInfo = reactive({
      columns : [{
        title: 'Name',
        dataIndex: 'name',
        slotName: 'name'
      }, {
        title: 'Salary',
        dataIndex: 'salary',
      }, {
        title: 'Address',
        dataIndex: 'address',
      }, {
        title: 'Province',
        dataIndex: 'province',
        slotName: 'province'
      }, {
        title: 'City',
        dataIndex: 'city',
        slotName: 'city'
      }, {
        title: 'Email',
        dataIndex: 'email',
      }],
      data : [{
        key: '1',
        name: 'Jane Doe',
        salary: 23000,
        address: '32 Park Road, London',
        province: 'Beijing',
        city: 'Haidian',
        email: 'jane.doe@example.com'
      }, {
        key: '2',
        name: 'Alisa Ross',
        salary: 25000,
        address: '35 Park Road, London',
        email: 'alisa.ross@example.com'
      }, {
        key: '3',
        name: 'Kevin Sandra',
        salary: 22000,
        address: '31 Park Road, London',
        province: 'Sichuan',
        city: 'Mianyang',
        email: 'kevin.sandra@example.com'
      }, {
        key: '4',
        name: 'Ed Hellen',
        salary: 17000,
        address: '42 Park Road, London',
        email: 'ed.hellen@example.com'
      }, {
        key: '5',
        name: 'William Smith',
        salary: 27000,
        address: '62 Park Road, London',
        email: 'william.smith@example.com'
      }]
    })
const cellInputFocus = ()=>{
  tableInfo.columns.splice(1,0,...toggleColumns)
}
const cellInputBlur = ()=>{
  tableInfo.columns.splice(1,toggleColumns.length)
}
onMounted(()=>{
  
})
</script>

<style lang="scss" scoped>

</style>