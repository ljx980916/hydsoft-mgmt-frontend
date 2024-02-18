<template>
  <div :style="{ padding: '60px 200px' }">
    <a-space direction="vertical">
      <a-breadcrumb>
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>
          <template #droplist>
            <a-cascader-panel :options="options" v-model="value" check-strictly :style="{ border: 'none' }" />
          </template>
          Channel
        </a-breadcrumb-item>
        <a-breadcrumb-item>News</a-breadcrumb-item>
      </a-breadcrumb>
    </a-space>
  </div>
</template>

<script setup>
import { ref } from "vue";
const value = ref("");
const options = [
  {
    value: "beijing",
    label: "Beijing",
    children: [
      {
        value: "chaoyang",
        label: "ChaoYang",
        children: [
          {
            value: "datunli",
            label: "Datunli",
          },
        ],
      },
      {
        value: "haidian",
        label: "Haidian",
        disabled: true,
      },
      {
        value: "dongcheng",
        label: "Dongcheng",
      },
      {
        value: "xicheng",
        label: "Xicheng",
        children: [
          {
            value: "jinrongjie",
            label: "Jinrongjie",
          },
          {
            value: "tianqiao",
            label: "Tianqiao",
          },
        ],
      },
    ],
  },
  {
    value: "shanghai",
    label: "Shanghai",
    children: [
      {
        value: "huangpu",
        label: "Huangpu",
      },
    ],
  },
];
</script>
