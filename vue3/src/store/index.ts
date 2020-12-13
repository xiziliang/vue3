import { createStore } from 'vuex';
import home, { IHomeState } from "./modules/home";
export interface GlobalState {
  home:IHomeState  
  // 可以写多个IHomeState,作用是总结  
}
const store =  createStore<GlobalState>({
  mutations: {
  },
  actions: {
  },
  modules: {
    home
  }
})

export default store