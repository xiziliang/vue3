<script setup lang='ts'>
import { shallowRef, watch, Ref } from 'vue';

const props = defineProps<{
    name: string;
    age: Ref<number> | number;
}>();
watch(() => props.age, (val) => {
    console.log(val)
})

console.log(props)

</script>
<template>
    <div>
    </div>
</template>