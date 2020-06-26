<template>
    <div class="footer">
        <p class="login">
            <router-link to="/login" v-if="!token">
                <span>登录</span>
            </router-link>
            <span v-else @click="out">退出</span>            
            <i></i><span>反馈</span></p>
        <div class="touch">
            <div>
                <i></i>
                <span>客户端</span>
            </div>
            <div>
                <i></i>
                <span>触屏版</span>
            </div>
            <div>
                <i></i>
                <span>电脑端</span>
            </div>
        </div>
        <p><span>隐私政策</span><i></i><span>用户协议</span><i></i><span>关于Cookie</span></p>
        <p>Copyright 1999版权所有</p>
        <p>营业执照 备案主体编号：12312312312312312</p>
        <p>粤ICP备123333号 粤公网安备 123123123123号</p>
        <p>增值电信业务经营许可证：粤12312312312</p>
    </div>
</template>
<script>
import {logout} from './../server/index'
import { mapMutations, mapState } from 'vuex'
export default {
    name: 'Footer',
    data() {
        return {}
    },
    computed:{
        ...mapState(['token']),
    },
    methods: {

        ...mapMutations(['UPDATE_TOKEN','UPDATE_COUNT']),
        out(){
            logout()
            this.UPDATE_TOKEN(false)
            this.UPDATE_COUNT(0)
        }
    },
}
</script>
<style scoped>
.footer {
    margin-bottom:2.8rem ;
    padding: 0.5rem;
    background: #fff;
    text-align: center;
}
.footer .login {
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 0.02rem solid rgba(153, 153, 153, 0.568);
    padding: 0.5rem 0;
}
.footer .login i {
    width: 0.06rem;
    height: 0.6rem;
    background: rgba(153, 153, 153, 0.384);
}
.footer .login span {
    padding: 0 1.6rem;
    font-size: 0.83rem;
    color: #333;
}
.touch {
    display: flex;
    justify-content: center;
    align-items: center;
}
.touch div {
    padding: 0.5rem 1rem;
}
.touch i {
    display: block;
    width: 2.2rem;
    height: 2.2rem;
    margin: 0 auto;
    background: url('./../images/31.png') no-repeat;
    background-size: cover;
}
.touch span {
    font-size: 0.7rem;
    color: #999;
}
.touch div:nth-child(2) span {
    color: #333;
}
.touch div:nth-child(2) i {
    background: url('./../images/32.png') no-repeat !important;
    background-size: cover !important;
    color: #333;
}
.touch div:nth-child(3) i {
    background: url('./../images/33.png') no-repeat !important;
    background-size: cover !important;
}
p {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.6rem;
    line-height: 1rem;
    color: #999;
}
p i {
    display: inline-block;
    width: 0.06rem;
    height: 0.6rem;
    background: rgba(153, 153, 153, 0.384);
}
p span {
    padding: 0 0.5rem;
    font-size: 0.7rem;
}
</style>
