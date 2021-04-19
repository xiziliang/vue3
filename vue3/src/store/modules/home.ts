import { GlobalState } from './../index';
import {Select_Types} from '@/type';
import * as Type from '../../type/action_types'
import {Module} from 'vuex';
export interface IHomeState {
    currentType:Select_Types,
    list:String[] | null,
    [key:string]:any
}
const state:IHomeState = {
    currentType:Select_Types.ALL,
    list: []
}
let arr:[String,Number] = ['xzl',123]; // 元组;
//<每一个state的状态,全局总的状态>
const home:Module<IHomeState,GlobalState> = {
    namespaced:true,
    state,
    mutations:{
        [Type.CHANGE_TYPE](state:any,payload:Select_Types){
            state.currentType = payload;
        }
    },
    actions:{

    },
}

export default home