// function effect(fn, option = {}) {
//     const effect = createReactiveEffect(fn, option);
//     if (!option.lazy) {
//         effect();
//     }
//     return effect;
// }

// // effect(()=>{
// //     state.name;
// //     effect(()=>{
// //         state.age;
// //     })
// //     state.address;
// // }) 做一个堆栈操作，要不然清空activeEffect的话，state.address 不会被收集
// let activeEffect;
// let uid = 0;
// const effectStack = [];

// function createReactiveEffect(fn, option) {
//     const effect = function () {
//         try {
//             activeEffect = effect;
//             effectStack.push(activeEffect);
//             return fn(); // 用户自己写的逻辑，一调用就会进行取值操作 
//         } finally {
//             effectStack.pop();
//             activeEffect = effectStack[effectStack.length - 1];
//         }
//     }
//     effect.id = uid++;
//     effect.deps = []; // 存储一下effect所依赖的属性
//     effect.option = option;

//     return effect;
// }

// // 属性和effect做一个关联
// // 简单来说通过 track 依赖收集 把用户对reactive所生成的代理对象中的属性做的处理收集起来，以这样的形式 {object:{key:[effect,effect]}}储存，object即为reactive所代理的对象;
// let targetMap = new WeakMap();
// export function track(target, key) {
//     if (activeEffect == undefined) {
//         return;
//     }
//     let depsMap = targetMap.get(target);
//     if (!depsMap) {
//         targetMap.set(target, (depsMap = new Map()));
//     }
//     let deps = depsMap.get(key);
//     if (!deps) {
//         depsMap.set(key, (deps = new Set()))
//     }
//     if (!deps.has(activeEffect)) {
//         deps.add(activeEffect);
//         activeEffect.deps.push(deps);
//     }
//     console.log(targetMap)
// }

// // 触发依赖
// export function trigger(target, type, key, value, oldValue) {
//     const depsMap = targetMap.get(target);
//     if (!depsMap) return;
//     const run = function (effects) {
//         if (effects) effects.forEach(effect => effect());
//     }
//     // 数组的处理 有多种情况

//     if(key === 'length' && isArray(target)){

//     }else{
//         // 对象的处理
//         if (key != void 0) {
//             run(depsMap.get(key))
//         }
//     }
// }


// let stateData = {
//     name:'xz'
// }
// let arr = [1,2,3]


// effect(() => {
//     app.innerHtml =  stateData.name;
//     app.innerHtml = arr.length; // ex 1
//     app.innerHtml = arr[2]; // ex 2
//     console.log('依赖收集!'); // 用户写的逻辑
// })
//     //当effect 中函数依赖的数据发生变化时，effect会重新执行
//     arr.length = 100;//ex 1  能收集length的依赖
//     arr.length = 1;//ex 2 不能收集length的依赖


















var effectApi = (function (exports) {
    let activeEffect; // 存储当前effect
    const effectStack = [];

    function effect(fn, options = {}) {
        const effect = createReactiveEffect(fn, options);
        if (!options.lazy) {

            effect();
        }
        return effect;
    }
    let uid = 0;

    function createReactiveEffect(fn, options) {
        const effect = function reactiveEffect() {
            if(!effectStack.includes(effect)){ // 防止同一个effect重复更新
                try {
                    effectStack.push(effect);
                    activeEffect = effect;
                    return fn(); // 函数首次执行
                } finally {
                    // 进行出栈
                    effectStack.pop();
                    activeEffect = effectStack[effectStack.length - 1];
                }
            }
        };
        effect.id = uid++;
        effect._isEffect = true;
        effect.raw = fn;
        effect.options = options;
        return effect;
    }
    // 让响应式数据 收集对应的effect函数
    function track(target, type, key) {
        activeEffect
    }
    exports.effect = effect;
    exports.track = track;
    return exports;
})({});