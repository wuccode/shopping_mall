import {
    UPDATE_TOKEN,
    UPDATE_COUNT,
    UPDATE_TABSHOW,
    ADD_CARTGOODS,
    INIT_CART,
    DELETE_CARTGOODS,
    UPDATE_CARTGOODS,
    ALLSELECT_CARTGOODS,
    ADD_EVALUATE 
} from './mutations-type'
import {allSelect,updateCart,delCart} from './../server/index'
export default {
    //修改登录状态
    [UPDATE_TOKEN](state, flag) {
        state.token = flag
    },
    //修改购物车总数
    [UPDATE_COUNT](state, count) {
        state.count = count
    },
    [UPDATE_TABSHOW](state, flag) {
        state.tabShow = flag
    },
    //添加商品到购物车
    [ADD_CARTGOODS](state, goods) {
        Object.keys(goods).forEach(key => state.addCartGoods[key] = goods[key])
    },
    //初始化购物车数据
    [INIT_CART](state, cart) {
        state.cartGoods = cart.reverse();
    },
    //删除购物车商品
    [DELETE_CARTGOODS](state, arrId) {
        arrId.forEach(id => {
            let index = state.cartGoods.findIndex(goods => goods._id === id)
            if(index !== -1){
                state.cartGoods.splice(index,1)               
            }
        })
        state.count = state.cartGoods.reduce((num,currentValue)=>  num+=currentValue.count, 0)
        delCart(arrId)
    },
    //修改购物车商品选中和数量
    [UPDATE_CARTGOODS](state,{index,key,value,id}){
        state.cartGoods[index][key] = value
        state.count = state.cartGoods.reduce((num,currentValue)=>  num+=currentValue.count, 0)
        updateCart(id,key,value)
    },
    //购物车全选
    [ALLSELECT_CARTGOODS](state,value){
        state.cartGoods.forEach(arr=>arr.checked = value);
        if(state.timer){
            clearTimeout(state.timer)
        }
        state.timer = setTimeout(()=>{
            allSelect(value)
        },600)
    },
    //设置评价商品
    [ADD_EVALUATE](state,obj){
        state.evaluate = obj        
    }
}