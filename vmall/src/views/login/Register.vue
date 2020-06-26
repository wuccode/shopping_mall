<template>
    <div class="register" ref="register">
        <h1>{{ index === 2 || is ? '账号和密码' : '手机号' }}</h1>
        <div class="int" v-show="index === 1 && done">
            <div>
                <input type="text" v-model="phone" @keyup="intUp" maxlength="11" />
                <span :class="{ focus: true, activeFocus: phone }"></span>
                <span class="default"></span>
                <span :class="{ placeholder: true, activePlaceholder: phone }">手机号</span>
            </div>
            <div>
                <input type="text" v-model="codeNum" @keyup="intUp" maxlength="6" />
                <span :class="{ focus: true, activeFocus: codeNum }"></span>
                <span class="default"></span>
                <span :class="{ placeholder: true, activePlaceholder: codeNum }">短信验证码</span>
                <button @click="sendCode" :class="{ canCode: code }" ref="sendCode">获取验证码</button>
                <p class="code">{{ conCode }}</p>
            </div>
        </div>
        <div class="int" v-show="index === 2 || !done">
            <div>
                <input type="text" v-model="account" @keyup="intUp" maxlength="16" @blur="account === '' ? (accountText = '') : accountText" />
                <span :class="{ focus: true, activeFocus: account }"></span>
                <span class="default"></span>
                <span :class="{ placeholder: true, activePlaceholder: account }">账号</span>
                <p class="code">{{ accountText }}</p>
            </div>
            <div>
                <input type="password" v-model="pwd" @keyup="intUp" maxlength="16" @blur="pwd === '' ? (pwdText = '') : pwdText" />
                <span :class="{ focus: true, activeFocus: pwd }"></span>
                <span class="default"></span>
                <span :class="{ placeholder: true, activePlaceholder: pwd }">密码</span>
                <p class="code">{{ pwdText }}</p>
            </div>
            <div>
                <input type="password" v-model="isPwd" @keyup="intUp" maxlength="16" />
                <span :class="{ focus: true, activeFocus: isPwd }"></span>
                <span class="default"></span>
                <span :class="{ placeholder: true, activePlaceholder: isPwd }">确定密码</span>
            </div>
        </div>
        <div class="prompt" v-show="isPrompt">{{ prompt }}</div>
        <div v-show="index === 2 || !done">
            <div class="title">密码需满足以下要求：</div>
            <div class="con">至少6个字符</div>
            <div class="con">至少含字母和数字，不能包含空格和中文</div>
        </div>
        <div class="left" @click="prev">上一步</div>
        <div class="right" @click="next">{{ index === 2 || is ? '完成' : '下一步' }}</div>
    </div>
</template>
<script>
import { delCode, sendCode, isCode, register } from './../../server/index'
import { current, time} from './../../config/countDown'
import {mapMutations} from 'vuex'
export default {
    name: 'Register',
    props: {
        done: Boolean,
        focusOne: String,
    },
    data() {
        return {
            reg: /^1(38|39|47|50|51|52|58|78|79|88|89|87)\d{8}$/,
            phone: '',
            codeNum: '',
            account: '',
            pwd: '',
            isPwd: '',
            code: false,
            isCurrent: true,
            conCode: '',
            index: 1,
            isPrompt: false,
            prompt: '',
            pwdText: '',
            flag: false,
            isAccount: false,
            accountText: '',
        }
    },
    computed: {
        is() {
            return !this.done ? 1 : 0
        },
    },
    created() {
        this.$nextTick(() => {
            let h = document.documentElement.clientHeight || document.body.clientHeight
            this.$refs.register.style.height = h + 'px'
        })
    },
    methods: {
        ...mapMutations(['UPDATE_TOKEN','UPDATE_COUNT']),
        async next() {
            this.isPrompt = true;
            this.isPrompt = ''; 
            if (this.index === 1 && this.done) {
                let res = await isCode(this.codeNum, this.phone)
                if (!res.data.code) {
                    if (this.code) {
                        this.prompt = '验证码错误'
                        this.isPrompt = true
                    } else {
                        this.prompt = '请输入正确的手机'
                        this.isPrompt = true
                    }
                    return
                }
            }
            if (!this.done && this.index === 1 && this.flag && this.isAccount) {
                let result = await register(this.focusOne, this.account, this.pwd, this.isPwd)
                if(result.data.success_code !== 200){
                    this.prompt = result.data.hint
                    this.isPrompt = true
                }else{
                    this.$router.go(-1)
                    this.UPDATE_TOKE(true)
                    this.UPDATE_COUNT(result.data.count)
                }

            }
            if (this.done && this.index === 2 && this.flag && this.isAccount) {
                let result = await register(this.phone, this.account, this.pwd, this.isPwd)
                if(result.data.success_code !== 200){
                    this.prompt = result.data.hint
                    this.isPrompt = true
                }else{
                    this.$router.go(-1)
                    this.UPDATE_TOKEN(true)
                    this.UPDATE_COUNT(result.data.count)
                }
            }
            if (this.index === 2 || !this.done) return
            this.index++
        },
        prev() {
            this.isPrompt = false 
            if (!this.done) {
                this.$emit('registerClose')
                return
            }
            if (this.index === 1) {
                clearInterval(this.$refs.sendCode.timer)
                this.$emit('registerClose')
                this.$refs.sendCode.innerText = '获取验证码'
                this.conCode = ''
                this.isCurrent = true
                return
            }
            this.index--
        },
        intUp() {
            if (this.isPrompt) {
                this.prompt = ''
                this.isPrompt = false
            }
            if (this.reg.test(this.phone)) {
                this.code = true
            } else {
                this.code = false
            }
            if (!/^\d+$/.test(this.phone)) {
                this.phone = this.phone.replace(/[^0-9]/gi, '')
            }
            if ((this.done && this.index === 2) || (!this.done && this.index === 1)) {
                this.account = this.account.replace(/[^0-9 a-z]/gi, '')
                if (event.target.type == 'text') {
                    if (/^[0-9 a-z]{7,16}/gi.test(this.account)) {
                        this.isAccount = true
                        this.accountText = ''
                    } else {
                        this.isAccount = false
                        this.accountText = '账号格式不正确'
                    }
                }
                if (event.target.type == 'password') {
                    if (!/(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{6,16}$/.test(this.pwd)) {
                        this.flag = false
                        this.pwdText = '密码格式不正确'
                    } else {
                        this.pwdText = ''
                        this.flag = true
                    }
                }
            }
        },
        async sendCode() {
            if (this.code && this.isCurrent) {
                this.isCurrent = false
                let result = await sendCode(this.phone, false)
                if (result.status === 200 && result.data.code !== false) {
                    this.conCode = '你的验证码是' + result.data.code
                    current(this.$refs.sendCode, time(1), 'S', () => {
                        this.isCurrent = true
                        this.$refs.sendCode.innerText = '获取验证码'
                        this.conCode = ''
                        delCode()
                    })
                } else {
                    this.$refs.sendCode.innerText = '获取验证码'
                    this.conCode = ''
                    this.isCurrent = true
                    this.$dialog.confirm({ message: result.data.hint, confirmButtonText: '登录' }).then(() => {
                        this.$emit('registerClose')
                    })
                }
            }
        },
    },
}
</script>
<style scoped>
.register {
    width: 100%;
    /* height: 100%; */
    background: #fff;
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
    padding: 1.6rem;
    box-sizing: border-box;
}
h1 {
    font-size: 1.2rem;
    font-weight: 500;
    text-align: center;
    padding: 0.8rem;
}
.int {
    margin: 2rem 0 0.2rem 0;
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
.left,
.right {
    position: absolute;
    bottom: 1.4rem;
    font-size: 0.84rem;
}
.left {
    background: url('./../../images/ic_public_arrow_left.png') no-repeat;
    background-size: contain;
    padding-left: 0.8rem;
}
.right {
    right: 1.6rem;
    background: url('./../../images/ic_public_arrow_right.png') no-repeat;
    background-size: contain;
    padding-right: 0.8rem;
    background-position-x: 2.8rem;
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
.title {
    font-size: 0.8rem;
    line-height: 2rem;
}
.con {
    font-size: 0.7rem;
    line-height: 1.2rem;
    color: #999;
}
.con::before {
    content: '';
    display: inline-block;
    background: url('./../../images/format_no.png') no-repeat;
    width: 0.8rem;
    height: 0.8rem;
    margin-right: 0.2rem;
    background-size: cover;
    vertical-align: middle;
}
</style>
