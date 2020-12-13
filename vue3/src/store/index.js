import { createStore } from "vuex";
import * as types from "./action-type";
import * as api from "../api/index";
export default createStore({
  state: {
    planlist: [],
  },
  mutations: {
    [types.ADD_PLAN](state, payload) {
      state.planlist = payload;
    },
    [types.SET_PLAN](state, payload) {
      // console.log(payload);
      state.planlist = [...payload];
      // console.log(state.planlist);
    },
    [types.DEL_PLAN](state, payload) {
      state.planlist = state.planlist.filter((item) => {
        return item._id !== payload._id;
      });
    },
  },
  actions: {
    async [types.ADD_PLAN]({ commit }, payload) {
      let plan = await api.addPlan(payload);
      commit(types.ADD_PLAN, plan);
    },
    async [types.SET_PLAN]({ commit }, payload) {
      debugger;
      let plan = await api.getPlan(payload);
      commit(types.SET_PLAN, plan);
    },
    async [types.DEL_PLAN]({ commit }, payload) {
      let plan = await api.delPlan(payload);
      commit(types.DEL_PLAN, plan);
    },
  },
  modules: {},
});
