<script setup lang='ts'>
import { shallowRef, watch, Ref, onUpdated } from 'vue';

const props = defineProps<{
    name: string;
    age: Ref<number> | number;
}>();

onUpdated(() => {
    console.log(`updated ----- ${props.age}`);
    console.log(`updated ----- ${props.name}`);
});

// watch(() => props.age, (val) => {
//     console.log(val)
// })

console.log(props)

</script>
<template>
    <div>
    </div>
</template>