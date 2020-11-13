<template>
<div>
    <canvas id="canvas" width="900" height="800"></canvas>

    <div>{{ a }}</div>
</div>
</template>

<script>
import {
    onMounted,
    ref,
    reactive
} from "vue";
import Canvas from "../assets/js/pieCanvas";
export default {
    setup(prop) {
        let pie = reactive({});
        let a = ref("你好 canvas");
        let data = [{
                title: "20岁以下",
                num: 6,
            },
            {
                title: "20-25岁",
                num: 50,
            },
            {
                title: "25-30岁",
                num: 20,
            },
            {
                title: "30岁以上",
                num: 4,
            },
        ];
        onMounted(() => {
            a.value = "莎莎侬";
            pie = new Canvas(data, "canvas", "pink");
        });
        return {
            data,
            a,
            pie,
        };
    },
};
</script>

<style scoped>
canvas {
    background-color: #eee;
}
</style>
