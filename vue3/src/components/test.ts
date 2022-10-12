import { ref, defineComponent, Fragment, h } from 'vue';
import { ElButton } from 'element-plus';

export const Test = defineComponent({
  setup(props, { emit, expose, slots }) {
    const count = ref(0);
    // NOTE: 第一种写法 slots.default?.()使用大部分场景，在render函数中可以不依赖h函数，因为本身就是vNode
    // const defaultSlot = slots.default?.();

    // NOTE: 第二种写法 h函数的第一个入参 可以是一个slot函数,不过需要先判断是否存在
    // return () => h(Fragment, null, [
    //   slots.default ? h(slots.default) : undefined,
    // ])
    
    // NOTE: 第三种写法 
    // return () => h(Fragment, null, [
    //   slots.default?.(),
    // ])

    return () => h(Fragment, null, [
      h('div', { class: 'xzl' }, slots.default?.())
    ])
  }
})
