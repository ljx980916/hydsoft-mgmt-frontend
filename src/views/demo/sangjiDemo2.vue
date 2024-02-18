<template>
    <div class="defaultPadding">
        <div id="sangji-main">

        </div>
    </div>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted } from 'vue';

onMounted(()=>{
    var chartDom = document.getElementById('sangji-main');
    var myChart = echarts.init(chartDom);
    var option;
    option = {
        title: {
            text: 'Visa Q1 FY23 Income Statement',
            left : 'center',
            textStyle : {
                fontSize: 30,
                fontWeight: 'bold',
                color: '#155171',
            }
        },
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },
        series: {
            type: 'sankey',
            layout: 'none',
            emphasis: {
            focus: 'adjacency'
            },
            nodeAlign: 'left',
            nodeWidth : 30,
            nodeGap: 40,
            data: [
            {
                name: 'Service',
                value : '2',
                itemStyle: {
                    color: '#05268D',
                    borderColor: '#3257A1'
                },
                label:{
                    position: "top",  
                    color:'#0C2466',
                    fontWeight : 'bold',
                    fontSize : '16px',
                }
            },
            {
                name: 'Data\nprocessing',
                itemStyle: {
                    color: '#05268D',
                    borderColor: '#3257A1'
                },
                label:{
                    position : 'top',
                    color:'#0C2466',
                    fontWeight : 'bold',
                    fontSize : '16px',
                },
            },
            {
                name: 'International\ntransaction',
                itemStyle: {
                    color: '#05268D',
                    borderColor: '#3257A1'
                },
                label:{
                    position : 'top',
                    color:'#0C2466',
                    fontWeight : 'bold',
                    fontSize : '16px',
                },
            },
            {
                name: 'Other',
                itemStyle: {
                    color: '#05268D',
                    borderColor: '#3257A1'
                },
                label:{
                    position : 'top',
                    color:'#0C2466',
                    fontWeight : 'bold',
                    fontSize : '16px',
                },
            },
            {
                name: 'Gross revenue',
                itemStyle: {
                    color: '#05268D',
                    borderColor: '#3257A1'
                },
                label:{
                    position : 'top',
                    color:'#0C2466',
                    fontWeight : 'bold',
                    fontSize : '16px',
                },
            },
            {
                name: 'Net revenue',
                itemStyle: {
                    color: '#05268D',
                    borderColor: '#3257A1'
                },
                label:{
                    position : 'top',
                    color:'#0C2466',
                    fontWeight : 'bold',
                    fontSize : '16px',
                },
            },
            {
                name: 'Client\nincentives',
                itemStyle: {
                    color: '#CB0305',
                    borderColor: '#D9484A'
                },
                label:{
                    position : 'bottom',
                    color:'#713027',
                    fontWeight : 'bold',
                    fontSize : '16px',
                },
            },
            {
                name: 'Gross Profit',
                itemStyle: {
                    color: '#2BA02E',
                    borderColor: '#52AD56'
                },
                label:{
                    position : 'top',
                    color:'#338463',
                    fontWeight : 'bold',
                    fontSize : '16px',
                },
            },
            {
                name: 'Network &\n processing',
                itemStyle: {
                    color: '#A82625',
                    borderColor: '#F0C8CA'
                },
                label:{
                    position : 'bottom',
                    color:'#7E4733',
                    fontWeight : 'bold',
                    fontSize : '16px',
                },
            },
            {
                name: 'Operating profit',
                itemStyle: {
                    color: '#2BA02E',
                    borderColor: '#52AD56'
                },
                label:{
                    position : 'top',
                    color:'#268361',
                    fontWeight : 'bold',
                    fontSize : '16px',
                },
            },
            {
                name: 'Operating\nexpenses',
                itemStyle: {
                    color: '#CB0305',
                    borderColor: '#DF5B58'
                },
                label:{
                    position : 'bottom',
                    color:'#8D4338',
                    fontWeight : 'bold',
                    fontSize : '16px',
                },
            },
            {
                name: 'Net profit',
                itemStyle: {
                    color: '#2BA02E',
                    borderColor: '#52AD56'
                },
                label:{
                    position : 'right',
                    color:'#369372',
                    fontWeight : 'bold',
                    fontSize : '16px',
                },
            },
            {
                name: 'Tax',
                itemStyle: {
                    color: '#CF0006',
                    borderColor: '#D4746F'
                },
                label:{
                    position : 'right',
                    color:'#AD7069',
                    fontWeight : 'bold',
                    fontSize : '16px',
                },
            },
            {
                name: 'Other($0.1B)',
                itemStyle: {
                    color: '#8D585B',
                    borderColor: '#C68F95'
                },
                label:{
                    position : 'right',
                    color:'#369372',
                    fontWeight : 'bold',
                    fontSize : '16px',
                },
            },
            {
                name: 'Personnel($1.3B)',
                itemStyle: {
                    color: '#CA0204',
                    borderColor: '#DD9492'
                },
                label:{
                    position : 'right',
                    color:'#C10D13',
                    fontWeight : 'bold',
                    fontSize : '16px',
                },
            },
            {
                name : 'Marketing ($0.3B)',
                itemStyle: {
                    color: '#B92228',
                    borderColor: '#D59A98'
                },
                label:{
                    position : 'right',
                    color:'#894C49',
                    fontWeight : 'bold',
                    fontSize : '16px',
                },
            },
            {
                name : 'General & admin ($0.3B)',
                itemStyle: {
                    color: '#C0040D',
                    borderColor: '#DB9297'
                },
                label:{
                    position : 'right',
                    color:'#AA7369',
                    fontWeight : 'bold',
                    fontSize : '16px',
                },
            },
            {
                name : 'D&A($0.2B)',
                itemStyle: {
                    color: '#BC3F49',
                    borderColor: '#EABBBE'
                },
                label:{
                    position : 'right',
                    color:'#AC706F',
                    fontWeight : 'bold',
                    fontSize : '16px',
                },
            },
            {
                name : 'Professional fees ($0.1B)',
                itemStyle: {
                    color: '#9D534F',
                    borderColor: '#CFA6AB'
                },
                label:{
                    position : 'right',
                    color:'#9E6758',
                    fontWeight : 'bold',
                    fontSize : '16px',
                },
            },
            {
                name : 'Litigation provision ($0.3B)',
                itemStyle: {
                    color: '#BA2026',
                    borderColor: '#D85258'
                },
                label:{
                    position : 'right',
                    color:'#904E4F',
                    fontWeight : 'bold',
                    fontSize : '16px',
                },
            },
            ],
            links: [
            {
                source: 'Service',
                target: 'Gross revenue',
                value: 2
            },
            {
                source: 'Data\nprocessing',
                target: 'Gross revenue',
                value: 2
            },
            {
                source: 'International\ntransaction',
                target: 'Gross revenue',
                value: 1.5
            },
            {
                source: 'Other',
                target: 'Gross revenue',
                value: 1
            },
            {
                source: 'Gross revenue',
                target: 'Net revenue',
                value: 4
            },
            {
                source: 'Gross revenue',
                target: 'Client\nincentives',
                value: 2.5
            },
            {
                source: 'Net revenue',
                target: 'Gross Profit',
                value: 3
            },
            {
                source: 'Net revenue',
                target: 'Network &\n processing',
                value: 1.5
            },
            {
                source: 'Gross Profit',
                target: 'Operating profit',
                value: 3
            },
            {
                source: 'Gross Profit',
                target: 'Operating\nexpenses',
                value: 2
            },
            {
                source: 'Operating profit',
                target: 'Net profit',
                value: 3
            },
            {
                source: 'Operating profit',
                target: 'Tax',
                value: .5
            },
            {
                source: 'Operating profit',
                target: 'Other($0.1B)',
                value: .1
            },
            {
                source: 'Operating\nexpenses',
                target: 'Personnel($1.3B)',
                value: .7
            },
            {
                source: 'Operating\nexpenses',
                target: 'Marketing ($0.3B)',
                value: .4
            },
            {
                source: 'Operating\nexpenses',
                target: 'General & admin ($0.3B)',
                value: .3
            },
            {
                source: 'Operating\nexpenses',
                target: 'D&A($0.2B)',
                value: .2
            },
            {
                source: 'Operating\nexpenses',
                target: 'Professional fees ($0.1B)',
                value: .2
            },
            {
                source: 'Operating\nexpenses',
                target: 'Litigation provision ($0.3B)',
                value: .3
            },
            ],
            levels: [
            {
              depth: 0,
              lineStyle: {
                color: 'target',
                opacity: .5
              }
            },
            {
              depth: 1,
              lineStyle: {
                color: 'target',
                opacity: 0.6
              }
            },
            {
              depth: 2,
              lineStyle: {
                color: 'target',
                opacity: 0.6
              }
            },
            {
              depth: 3,
              lineStyle: {
                color: 'target',
                opacity: 0.6
              }
            },
            {
              depth: 4,
              lineStyle: {
                color: 'target',
                opacity: 0.6
              }
            }
          ],
          lineStyle: {
            curveness: 0.5
          }
        }
    };

    option && myChart.setOption(option);
})

</script>

<style lang="scss">
#sangji-main{
    height: 700px;
    //background-color: aqua;
}
</style>