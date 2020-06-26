<template>
    <div>
        <div class="wrapper">
            <div class="navImg" @click="$router.go(-1)">
            </div>
            <div class="int">
                <input type="text" placeholder="P40 Pro" autofocus/>
            </div>
            <div class="login">搜索</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'SearchGoods',
    data() {
        return {}
    },
    methods: {},
    components: {
    },
}
</script>
<style scoped>
.wrapper{
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 2.4rem;
    padding: 0.5rem;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content:space-around;
    top: 0;
    box-sizing: border-box;
    box-shadow: 0 -0.2rem 0.33rem rgba(98, 55, 55, 0.5)
}
.wrapper .navImg{
    width: 1rem;
    height: 1.5rem;
    background: url('./../../images/icon_black_1.png') no-repeat;
    background-size:cover ;

}

.int{
    width: 15rem;
    height: 1.8rem;
    background: #F5F5F5;
    border-radius:2rem ;
    margin: 0 0.5rem;
    display: flex;
    justify-content: flex-end;
}
.int input{
    width: 80%;
    height: 1.8rem;
    border: none;
    outline: none;
    background: none;
    font-size: 0.76rem;
    margin-right: 1rem;

}
.int input::placeholder{
    color:#999;
}
.int::before{
    content: '';
    display: inline-block;
    width: 1rem;
    height:auto;
    background: url('./../../images/icon_search.png') no-repeat;
    background-size:contain ;
    background-position:center center ;
    margin: 0 0.4rem 0 0.6rem;

}
.login{
    font-size: 0.8rem;
    color: #333;
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
}
.login img{
    width: 80%;
    vertical-align: middle;
}
</style>
