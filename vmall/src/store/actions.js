import {getCart} from './../server/index'
export default {
        async addCart({commit}){
            let result = await getCart()
            if(result.data.success_code === 200){
                commit('INIT_CART',result.data.data.cart)
            }   
        }  
}