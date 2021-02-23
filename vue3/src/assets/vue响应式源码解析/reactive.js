// 响应式原理
let activeEffect;
// effect 副作用 对象变化重新渲染页面
export function effect(fn) {
  // 渲染函数传进来
  activeEffect = fn; // 储存一下 等数据更新再重新调用
  fn(); // 先渲染一遍
  activeEffect = null; //渲染完以后清空
}
//reactive 通过reactive 把对象封装成响应式对象
export function reactive(target) {
  //p.a.b.c
  // 默认只代理p（第一层） 当取值的时候才会对p对象中的对应值(p.a)做代理
  return new Proxy(target, {
    // proxy 第二个参数 是用来写定制拦截器的
    // set  方法用于拦截设置属性值的操作
    set(target, key, value, receiver) {
      // 设置值的时候
      //拦截器  修改哪个属性 改写哪个
      const res = Reflect.set(target, key, value, receiver);
      trigger(target, key);
      //   res && activeEffect();
      return res; // proxy 需要有返回值
    },
    // get 方法用于拦截对象的读取属性操作
    get(target, key, receiver) {
      // p.a  返回的是a的代理
      //   if (typeof target[key] === "object") {
      //     return reactive(target[key]); // 递归
      //   }
      const res = Reflect.get(target, key, receiver);
      track(target, key);
    },
  });
}
// {
//     //map
//     {name:'xl',age12}:{
//         //map
//         name:[effect,effect] //set
//     }
// }
const trackMap = new WeakMap();
//依赖收集  页面上要展示的属性进行改变以后才能渲染页面
function track(target, key) {
  let depsMap = trackMap.get(target);
  if (!depsMap) {
    trackMap.set(target, (depsMap = new Map()));
  }
  let deps = trackMap.get(key);
  if (!deps) {
    depsMap.set(key, (deps = new Set()));
  }
  if (activeEffect && !deps.has(activeEffect)) {
    deps.add(activeEffect);
  }
} // target 上的 key 的多个 effect
// 依赖触发  触发收集的依赖 也就是 effect
function trigger(target, key) {
  const depsMap = trackMap.get(target);
  if (!depsMap) return;
  let effects = depsMap.get(key);
  effects && effects.forEach((effect) => effect());
}

// reactive 源码
const isObject = (val) => val !== null && typeof val === 'object';
function reactive(target) {
  // if trying to observe a readonly proxy, return the readonly version.
  if (target && target["__v_isReadonly" /* IS_READONLY */]) {
      return target;
  }
  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers);
}

function createReactiveObject(target, isReadonly, baseHandlers, collectionHandlers) {
  if (!isObject(target)) {
      {
          console.warn(`value cannot be made reactive: ${String(target)}`);
      }
      return target;
  }
  // target is already a Proxy, return it.
  // exception: calling readonly() on a reactive object
  if (target["__v_raw" /* RAW */] &&
      !(isReadonly && target["__v_isReactive" /* IS_REACTIVE */])) {
      return target;
  }
  // target already has corresponding Proxy
  const proxyMap = isReadonly ? readonlyMap : reactiveMap;
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
      return existingProxy;
  }
  // only a whitelist of value types can be observed.
  const targetType = getTargetType(target);
  if (targetType === 0 /* INVALID */) {
      return target;
  }
  const proxy = new Proxy(target, targetType === 2 /* COLLECTION */ ? collectionHandlers : baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}