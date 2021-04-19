<template>
  <div class="home">
    <homehearder
      :curruntState="curruntState"
      @changeState="changeState"
    ></homehearder>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { Store, useStore } from "vuex";
import { GlobalState } from "../store/index";
import { Select_Types } from "../type/index";
import * as Type from "../type/action_types";
import homehearder from "../components/home/homehearder.vue";
function stateTought(store: Store<GlobalState>) {
  const curruntState = computed(() => store.state.home.currentType);
  const changeState = (curruntState: Select_Types) => {
    console.log(curruntState);
    store.commit(`home/${Type.CHANGE_TYPE}`, curruntState);
  };
  return {
    curruntState,
    changeState,
  };
}
export default defineComponent({
  name: "Home",
  components: {
    homehearder,
  },
  setup() {
    const store = useStore<GlobalState>();
    const { curruntState, changeState } = stateTought(store);
    return { store, curruntState, changeState };
  },
});
</script>
