import Reactive from './reactive.vue';
import EffectScope from './effectScope.vue';
import SlotComp from './slot.vue';
import VirtualScroll from './virtualScroll.vue';
import { Test } from './test'

const components = {
  Reactive,
  EffectScope,
  SlotComp,
  VirtualScroll,
  Test,
};

const install = app => {
  Object.entries(components).forEach(([name, component]) => {
    app.component(name, component);
  });
};

export default {
  install,
};
