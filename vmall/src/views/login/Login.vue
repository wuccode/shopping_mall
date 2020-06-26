<template>
    <div class="login">
        <!-- <div class="headLogo">
            <img src="./../../images/loginLogo.png" alt="" />
            
        </div> -->
        <h1>用户登录</h1>
        <div class="int">
            <div>
                <input v-show="!flag" type="text" v-model="focusOne" @keyup="intUp" maxlength="11" />
                <input v-show="flag" type="text" v-model="focusOne" @keyup="intUp" maxlength="16" />
                <span :class="{ focus: true, activeFocus: focusOne }"></span>
                <span class="default"></span>
                <span :class="{ placeholder: true, activePlaceholder: focusOne }">{{ !flag ? '手机号' : '手机号/账号' }}</span>
            </div>
            <div>
                <input v-show="!flag" type="text" v-model="focusTwo" @keyup="intUp" maxlength="6" />
                <input v-show="flag" type="password" v-model="focusTwo" @keyup="intUp" />
                <span :class="{ focus: true, activeFocus: focusTwo }"></span>
                <span class="default"></span>
                <span :class="{ placeholder: true, activePlaceholder: focusTwo }">{{ !flag ? '短信验证码' : '密码' }}</span>
                <button @click="sendCode" :class="{ canCode: code }" v-show="!flag" ref="sendCode">获取验证码</button>
                <p class="code" v-show="!flag">{{ conCode }}</p>
            </div>
            <div class="prompt" v-show="isPrompt">{{ prompt }}</div>
        </div>
        <p class="note" v-show="flag"><span @click="note">短信验证码登录</span><span>忘记密码</span></p>
        <van-checkbox v-model="checked" shape="square" checked-color="#ca141d" icon-size="16" class="checkbox">记住账号</van-checkbox>
        <div @click="register" :class="{ loginBtn: true, canCode: focusOne !== '' && focusTwo !== '' && code }">{{ !flag ? '登录/注册' : '登录' }}</div>
        <div v-show="flag" :class="{ loginBtn: true, sign: true, canCode: focusOne !== '' && focusTwo !== '' && code }" @click="isShow">注册账号</div>
        <p class="loginPwd" v-show="!flag" @click="loginPwd">密码登录</p>

        <Register v-show="isRegister" :done="done" @registerClose="registerClose" :focusOne="focusOne"></Register>
    </div>
</template>
<script>
import { userLogin, delCode, sendCode } from './../../server/index'
import { current, time} from './../../config/countDown'
import Register from './Register'
import { mapMutations } from 'vuex'
export default {
    name: 'Login',
    data() {
        return {
            focusOne: '',
            focusTwo: '',
            code: false,
            checked: false,
            flag: false,
            isRegister: false,
            isCurrent: true,
            prompt: '',
            isPrompt: false,
            done: true,
            conCode: '',
            reg: /^1(38|39|47|50|51|52|58|78|79|88|89|87)\d{8}$/,
        }
    },
    created() {
        this.UPDATE_TABSHOW(false)
        this.prompt = ''
        this.isPrompt = false
        delCode()
    },
    methods: {
        ...mapMutations(['UPDATE_TOKEN','UPDATE_COUNT','UPDATE_TABSHOW']),
        isShow() {
            this.isRegister = true
        },
        intUp() {
            if (this.isPrompt) {
                this.prompt = ''
                this.isPrompt = false
            }
            if (this.reg.test(this.focusOne)) {
                this.code = true
            } else {
                this.code = false
            }
            if (!/^\d+$/.test(this.focusOne) && !this.flag) {
                this.focusOne = this.focusOne.replace(/[^0-9]/gi, '')
            }
            if (this.flag) {
                this.focusOne = this.focusOne.replace(/[^0-9 a-z]/gi, '')
            }
            if (/^[0-9 a-z]{8,16}/gi.test(this.focusOne) && this.flag) {
                this.code = true
            }
        },
        loginPwd() {
            this.flag = true
            this.prompt = ''
            this.isPrompt = false
            if (!this.reg.test(this.focusOne)) {
                this.focusOne = ''
            }
            this.focusTwo = ''
        },
        note() {
            this.flag = false
            this.prompt = ''
            this.isPrompt = false
            if (!this.reg.test(this.focusOne)) {
                this.focusOne = ''
                this.code = false
            }
            this.focusTwo = ''
        },
        async register() {
            if (this.focusOne !== '' && this.focusTwo !== '' && this.code && !this.flag) {
                let result = await userLogin({ phone: this.focusOne, code: this.focusTwo })
                if (result.status === 200 && result.data.login) {
                    this.$router.go(-1)                    
                    this.UPDATE_TOKEN(true)
                    this.UPDATE_COUNT(result.data.count)

                } else {
                    if (result.data.hint !== '注册') {
                        this.prompt = result.data.hint
                        this.isPrompt = true
                    } else {
                        this.isRegister = true
                        this.done = false
                    }
                }
            }
            if (this.focusOne !== '' && this.focusTwo !== '' && this.code && this.flag) {
                let result = await userLogin({ account: this.focusOne, password: this.focusTwo })
                if (result.status === 200 && result.data.login) {
                    this.$router.go(-1)
                    this.UPDATE_TOKEN(true)
                    this.UPDATE_COUNT(result.data.count)
                } else {
                    this.prompt = result.data.hint
                    this.isPrompt = true
                }
            }
        },
        registerClose() {
            clearInterval(this.$refs.sendCode.timer)
            this.isRegister = false
            this.done = true
            this.$refs.sendCode.innerText = '获取验证码'
            this.conCode = ''
            this.isCurrent = true
        },
        async sendCode() {
            if (this.code && this.isCurrent) {
                this.isCurrent = false
                let result = await sendCode(this.focusOne, true)
                if (result.status === 200) {
                    console.log()
                    this.conCode = '你的验证码是' + result.data.code                    
                    current(this.$refs.sendCode, time(1), 'S', () => {
                        this.isCurrent = true
                        this.$refs.sendCode.innerText = '获取验证码'
                        this.conCode = ''
                        delCode()
                    })
                }
            }
        },
    },
    beforeDestroy() {
        this.UPDATE_TABSHOW(true)
    },
    components: {
        Register,
    },
}
</script>
<style scoped>
.login {
    padding: 1.6rem;
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
}
h1 {
    font-size: 1.2rem;
    font-weight: 500;
    text-align: center;
    padding: 0.8rem;
}
.headLogo {
    width: 100%;
    text-align: center;
}
.headLogo img {
    width: 3rem;
}
.int {
    margin: 5rem 0 0.2rem 0;
}
.int div {
    width: 100%;
    height: 3rem;
    padding: 0.5rem 0;
    position: relative;
}
.int div .default,
.int div .focus {
    position: absolute;
    width: 100%;
    bottom: 1rem;
    left: 0;
    height: 0.06rem;
    z-index: 999;
    background: rgba(102, 102, 102, 0.11);
    transition: all 0.3s ease-out;
}
.int div .focus {
    width: 0;
    background: linear-gradient(120deg, #9fceff 30%, #ff7300, #ca141d) !important;
    z-index: 99;
}
.int div input {
    position: relative;
    /* z-index: 9; */
    z-index: 99;
    width: 100%;
    height: 3rem;
    border: none;
    font-size: 0.8rem;
    font-weight: 400;
    outline: none;
    background: transparent;
}
.int div input:focus ~ .focus {
    width: 100% !important;
}

.int div .placeholder {
    position: absolute;
    left: 0;
    font-size: 0.8rem;
    color: #888;
    top: 50%;
    transform: translateY(-55%);
    transition: all 0.3s ease-out;
}
.int div input:focus ~ .placeholder {
    top: 0.6rem !important;
    color: #9fceff;
    /* font-size: 1rem !important; */
}
.activeFocus {
    width: 100% !important;
}
.activePlaceholder {
    top: 0.6rem !important;
    color: #9fceff !important;
}
.int div button {
    position: absolute;
    right: 0;
    border: none;
    background: none;
    top: 50%;
    z-index: 99;
    transform: translateY(-55%);
    font-size: 0.8rem;
    color: #ca141d;
    opacity: 0.3;
}
.canCode {
    opacity: 1 !important;
}
.checkbox {
    font-size: 0.7rem;
    display: inline-block;
    align-items: center;
    width: 5rem;
}
.checkbox >>> .van-checkbox__icon {
    display: inline-block !important;
    vertical-align: middle;
}
.checkbox >>> span {
    display: inline-block !important;
    vertical-align: top;
    color: #191919;
}
.loginBtn {
    margin: 1.6rem auto 0 auto;
    width: 100%;
    padding: 0.6rem 0;
    background: #ca141d;
    text-align: center;
    font-size: 0.8rem;
    color: #fff;
    border-radius: 3rem;
    /* letter-spacing: 0.1rem; */
    opacity: 0.3;
}
.loginPwd {
    text-align: center;
    margin: 0.8rem;
    font-size: 0.76rem;
    color: #ca141d;
}
.note {
    font-size: 0.72rem;
    color: #ca141d;
    padding: 0 0 0.8rem 0;
    display: flex;
    justify-content: space-between;
}
.sign {
    color: #ca141d !important;
    background: rgba(0, 0, 0, 0.05);
    margin-top: 1rem;
    opacity: 1;
}
.prompt {
    padding: 0;
    position: relative;
    top: -0.9rem;
    height: 0 !important;
    font-size: 0.68rem;
    z-index: -1;
    color: #ca141d;
}
.code {
    position: absolute !important;
    display: inline-block;
    height: 0 !important;
    /* width: 0 !important; */
    right: 0rem;
    bottom: 0.4rem;
    font-size: 0.68rem;
    z-index: -1;
    color: #ca141d;
}
</style>
