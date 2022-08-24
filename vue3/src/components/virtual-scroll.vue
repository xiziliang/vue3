<script setup>
/**
单个条目高度 offset 已知
1. 首先获取容器高度 ch
2. 根据容器高度算出条目activeRows = Math.ceil(ch / 单个条目高度offset)
3. 根据activeRows得出可视区域列表 data = list.slice(startIndex = 0 , endIndex = startIndex + activeRows - 1)
 完成初次渲染
4. startIndex = Math.floor(容器scrollTop/ offset)
5. 定位元素位置 pos =  startIndex * height
 */
import { onMounted, ref, defineProps, computed, watchEffect, watch } from "vue";
import { ElEmpty } from 'element-plus';
import { useScroll } from '@vueuse/core';

const props = defineProps({ data: Array, height: Number, offset: Number });

const lists = ref([]);
const offset = props.offset ?? 40;
const ch = ref(0);

const startIndex = ref(0);
const ulRef = ref(null);
const divRef = ref(null);
const lastScrollTop = ref(0);

const { y } = useScroll(divRef);

const lastIndex = computed(() => {
  const len = props.data.length;
  const lastIndex = startIndex.value + Math.ceil(ch.value / offset) + 2;
  return lastIndex > len ? len : lastIndex;
});
const listData = computed(() => {
  if (!lists.value.length) {
    let index = startIndex.value;
    return props.data.slice(index, lastIndex.value + 1).map((v) => ({ ...v,pos: index * offset,index: index++ }));
  }
});
const listHeight = computed(() =>  props.data.length * offset);

const showEmpty = computed(() => (listHeight.value - props.height) <= y.value );

watchEffect(() => {
  lastScrollTop.value = y.value;
  startIndex.value = Math.floor(lastScrollTop.value / offset);
})

onMounted(() => {
  ch.value = divRef.value.offsetHeight;
});
</script>

<template>
  <div class="virtual-scroll" ref="divRef" :style="{ height: height + 'px' }">
    <ul ref="ulRef" class="ul" :style="{ height: `${listHeight}px` }">
      <li v-for="(x) in listData" :style="{
        position: 'absolute',
        transform: `translateY(${x.pos}px)`,
      }" :key="`list-${x.index}`">
        <slot :data="x"></slot>
      </li>
      <li v-if="showEmpty" :style="{ transform: `translateY(${listHeight}px)` }"> <ElEmpty /></li>
    </ul>
  </div>
</template>
<style lang="scss">
.virtual-scroll {
  background: lightyellow;
  overflow: auto;
}

.ul {
  position: relative;
  margin: 0px;

  > li {
    display: block;
  }
}
</style>
