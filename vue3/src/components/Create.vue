<template>
<div>
    <div>
        creat组件
    </div>
    <button @click="onClick">点击</button>
</div>
</template>

<script>
export default {
    name: "Create",
    setup(props, {
        emit
    }) {
        const onClick = () => {
            emit("handle", "我是子组件")
        }
        return {
            onClick
        }
    }
};
</script>

<style  scoped>
</style>
