<script setup lang='ts'>
import { shallowRef } from 'vue'
// NOTE: 在使用shallowRef的时候，数据在.value上进行修改的时候是不会产生副作用的，所用使用watch和computed对.value上的数据进行监听
// NOTE: 是监听不到副作用的，但是数据是更新了的，所以视图的更新的时候会取最新的数据，所以在视图上是会进行更新的。

const newObject = {};
const shallowArr = shallowRef([])
const shallowArray = shallowRef<any[]>([
  /* 巨大的列表，里面包含深层的对象 */
])

// 这不会触发更新...
shallowArray.value.push(newObject)
// 这才会触发更新
shallowArray.value = [...shallowArr.value, newObject]

// 这不会触发更新...
shallowArray.value[0].foo = 1
// 这才会触发更新
shallowArray.value = [
  {
    ...shallowArray.value[0],
    foo: 1
  },
  ...shallowArray.value.slice(1)
]
</script>
<template>
    <div>
      
    </div>
</template>
