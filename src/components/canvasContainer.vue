<template>
  <canvas
    :width="props.width"
    :height="props.height"
    ref="canvasEl"
    :style="{
      padding: '10px',
      backgroundColor: 'rgb(var(--arcoblue-1))',
    }"
  ></canvas>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
const props = defineProps({
  // 折线路径数据
  route: {
    type: Array,
    default: () => [],
  },
  height: {
    type: Number,
    default: 20,
  },
  width: {
    type: Number,
    default: 50,
  },
});
watch(
  () => props.route,
  (old, newProps) => {
    if (old !== newProps) {
      animate();
    }
  },
);
const canvasEl = ref(null);
const animate = () => {
  let ctx = canvasEl.value && canvasEl.value.getContext("2d");
  ctx.clearRect(0, 0, props.width, props.height);
  ctx.translate(0, props.height);
  ctx.scale(1, -1);
  ctx.moveTo(...props.route[0]);
  ctx.clearRect(0, 0, 50, 20);
  props.route.forEach(item => {
    ctx.lineTo(...item);
    ctx.strokeStyle = "blue";
    ctx.stroke();
  });
};
onMounted(() => {
  animate();
});
</script>
