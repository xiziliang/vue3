export default  function directive(app) {
    let ob = new IntersectionObserver((changes)=>{
        changes.forEach((item)=>{
            let {target,isIntersecting} = item;
            if(!isIntersecting) return; // 目标出现为true
            target.$imgbox.src = target.$src;
            target.$imgbox.style.opacity = 1;
            ob.unobserve(target);
        })
    },{
        threshold:[0.5]
    })
    app.directive('lazyimg',{
        /** beforeMount
         * @param el // dom元素  
         * @param binding   // 数据对象 
         * @param vnode   // 节点
         * @param preVnode  //
         */
        beforeMount(el, binding , vnode , preVnode) {
            // binding :数据对象
            //       + arg:传给指令的参数  v-xxx:n => arg:'n'
            //       + modifiers:修饰符对象  v-xxx.stop => modifiers：{stop：true}
            //       + value:指令绑定的值  v-xxx = "2" value：2
            //       + oldvalue 之前绑定的值
            console.log(el, binding , vnode , preVnode)
        },
        mounted(el,binding) { 
            console.log(el,binding)
            let imgbox = el.querySelector('img');
            if(!imgbox) return;
            imgbox.src = '';
            imgbox.style.opacity = 0;
            imgbox.style.transition = 'opacity .5s';
            el.$src = binding.value;
            el.$imgbox = imgbox;
            ob.observe(el);
        },
        beforeUpdate() {
            
        },
        updated() {
            
        },
        beforeUnmount() {
            
        },
        unmounted() {
            
        },
    })
}