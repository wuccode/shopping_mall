<template>
    <div class="evaluate">
        <div class="headBar">
            <i @click="$router.push('/order?index=2')"></i>
            <span>订单中心</span>
            <span class="btn" @click="readData">提交</span>
        </div>
        <div class="nav">
            <div class="img">
                <img :src="url + evaluate.img" alt="" />
            </div>
            <div class="content">
                <p>商品评价</p>
                <p :class="{ active: select }" @click="select = !select"></p>
                <span>{{ select ? '好评' : '差评' }}</span>
            </div>
        </div>
        <div class="bar"></div>
        <div class="text">
            <textarea v-model="value" id="" maxlength="100" placeholder="请说出你的评价，可以帮助跟多小伙伴哦~"></textarea>
        </div>
        <van-uploader v-model="fileList" multiple :max-count="6" />
        <div class="bar"></div>
    </div>
</template>
<script>
import { URL, addCompleted, addComment } from './../../server/index'
import { mapState } from 'vuex'
export default {
    data() {
        return {
            select: true,
            fileList: [],
            formData: null,
            value: '',
        }
    },
    created() {
        console.log(this.evaluate)
    },
    computed: {
        ...mapState(['evaluate']),
        url() {
            return URL
        },
    },
    methods: {
        // afterRead(){
        //     this.formData = new FormData()
        //     this.fileList.forEach(e => this.formData.append('img',e.file));
        // },
        async readData() {
            if (this.value === '') {
                this.$toast('请输入评价内容')
                return
            }
            let formData = new FormData()
            let star = this.select ? 5 : 0
            this.fileList.forEach((e) => formData.append('img', e.file))
            formData.append('value', this.value)
            formData.append('star', star)
            formData.append('model', this.evaluate.model)
            formData.append('particularId', this.evaluate.particularId)
            await addComment(formData)
            await addCompleted(this.evaluate._id, this.evaluate.serial)
            this.$dialog
                .confirm({ message: '评价已发布', confirmButtonText: '查看评论', cancelButtonText: '返回订单' })
                .then(() => {
                    this.$router.push('/product?id='+ this.evaluate.particularId)
                })
                .catch(() => {
                    this.$router.push('/order?index='+ 3)
                })
        },
    },
}
</script>
<style scoped>
.evaluate {
    width: 100%;
    height: 100vh;
}
.bar {
    height: 0.4rem;
    width: 100%;
    background: #f9f9f9;
}
.headBar {
    padding: 0.5rem 0.5rem;
    z-index: 99;
    background: #fff;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    color: #333;
    box-sizing: border-box;
}
.headBar i {
    position: absolute;
}
.headBar i:nth-child(1) {
    left: 0.5rem;
    width: 1rem;
    height: 1.6rem;
    background: url('./../../images/icon_black_1.png') no-repeat;
    background-size: cover;
}
.headBar i:nth-child(3) {
    height: 1.6rem;
    right: 1rem;
    width: 1.6rem;
}

.nav {
    width: 100%;
    padding: 0.8rem 0.8rem;
    display: flex;
    align-items: center;
}
.nav .img {
    width: 4rem;
    margin-right: 1rem;
}
.nav .img img {
    width: 100%;
}
.nav .content {
    align-self: flex-start;
}
.nav .content p {
    font-size: 0.8rem;
    line-height: 2rem;
}
.nav .content p:nth-child(2) {
    height: 0.94rem;
    width: 6.6rem;
    background: url('./../../images/star6.png') no-repeat;
    background-size: 100% 200%;
    display: inline-block;
}
.nav .content span {
    font-size: 0.76rem;
    vertical-align: top;
    margin-left: 0.5rem;
}
.active {
    background-position: 0 -0.94rem !important;
}
.text {
    width: 100%;
    height: 8rem;
    padding: 0.8rem;
    box-sizing: border-box;
    margin-top: 0.6rem;
}
.text textarea {
    width: 100%;
    height: 100%;
    font-size: 0.7rem;
    border: none;
    resize: none;
}
.van-uploader {
    width: 100%;
    padding: 0.8rem 0;
    box-sizing: border-box;
}
.van-uploader >>> .van-uploader__wrapper {
    display: flex;
    justify-content: center;
}
.van-uploader >>> .van-uploader__preview {
    flex: 0 0 20%;
    height: 4.2rem;
}
.van-uploader >>> .van-uploader__preview-image {
    width: 100%;
    height: 100%;
}
.van-uploader >>> .van-uploader__upload {
    flex: 0 0 20%;
    height: 4.2rem;
}
.van-uploader >>> .van-uploader__upload >>> .van-uploader__input {
    width: 100%;
}
.van-uploader >>> .van-uploader__upload {
    box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.144);
}
.btn {
    position: absolute;
    right: 0.7rem;
    font-size: 0.8rem;
    padding: 0.3rem;
}
</style>
