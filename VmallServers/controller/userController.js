import User from '../models/User'
import md5 from 'md5-node'

//登录
export const login = async (req, res) => {
   let { phone, account, password, code } = req.body;
   //手机号登录
   let is = await User.findOne({ $or: [{ phone: phone }, { account: account }, { phone: account }] })
   if (is && is.flag) {
      res.json({
         hint: "已在其他设备上登录",
         login: false
      })
   }
   if (phone && !account) {
      if (code === req.session.code && phone === req.session.phone) {
         let doc = await User.findOne({ phone: phone })
         if (doc) {
            // doc.flag = true;
            // doc.save()
            req.session.userId = doc._id
            let num = 0;
            doc.cart.forEach(arr => num += arr.count)
            res.json({
               login: true,
               count: num,
            })
         } else {
            res.json({
               hint: "注册",
               login: false
            })
         }
      } else {
         res.json({
            hint: "验证码错误",
            login: false
         })
      }
   }
   //账号登录
   if (!phone && account) {
      let doc = await User.findOne({ $or: [{ phone: account }, { account: account }] })
      if (doc) {
         if (doc.password === password) {
            // doc.flag = true;
            // doc.save()
            req.session.userId = doc._id
            let num = 0;
            doc.cart.forEach(arr => num += arr.count)
            res.json({
               login: true,
               count: num,
            })
         } else {
            res.json({
               hint: "密码错误",
               login: false
            })
         }
      } else {
         res.json({
            hint: "手机或账号不存在",
            login: false
         })
      }
   }
}
//发送验证码
export const sendCode = async (req, res) => {
   let { phone, flag } = req.body;
   let code = ('000000' + Math.floor(Math.random() * 999999)).slice(-6);
   if (!flag) {
      let doc = await User.findOne({ phone: phone })
      if (doc) {
         res.json({
            hint: "该号码已经被注册，请登录",
            code: false
         })
      } else {   
         req.session.code = code;
         req.session.phone = phone;
         res.json({
            phone: phone,
            code: req.session.code
         })
      }
   } else {
      req.session.code = code;
      req.session.phone = phone;
      res.json({
         phone: phone,
         code: req.session.code
      })
   }
}
//判断是否登录
export const isLogin = async (req, res) => {
   if (req.session.userId) {
      let doc = await User.findOne({ _id: req.session.userId }, { cart: 1 });
      let num = 0;
      doc.cart.forEach(arr => num += arr.count)
      res.json({
         login: true,
         count: num,
      })
   } else {
      res.json({
         login: false,
         count: 0,

      })
   }
}
//删除验证码
export const delCode = (req, res) => {
   req.session.code = md5('dhklahioiualjqlwhiobzx123ASKPIOmoihOAIJDQJKJC12311MKHG2OkkkihdpmxnywqpxuigyajsdgywOJAODPJJ21')
   res.json({
      code: false
   })
}
export const isCode = (req, res) => {
   let { code, phone } = req.body
   if (code === req.session.code && phone === req.session.phone) {
      res.json({
         code: true
      })
   } else {
      res.json({
         code: false
      })
   }
}
export const register = async (req, res) => {
   let { phone, account, pwd, isPwd } = req.body
   let doc = await User.findOne({ account: account })
   if (!doc) {
      if (isPwd === pwd) {
         let user = new User({
            //用户名
            user: phone,
            //账号
            account: account,
            //手机号
            phone: phone,
            //密码
            password: isPwd,
         })
         user.save(async (err, result) => {
            if (err) throw err
            req.session.userId = result._id
            let doc = await User.findOne({ _id: req.session.userId }, { cart: 1 });
            let num = 0;
            doc.cart.forEach(arr => num += arr.count)
            res.json({
               count: num,
               success_code: 200,
               data: '注册成功'
            })
         })
      } else {
         res.json({
            hint: "两个密码不一致",
         })
      }
   } else {
      res.json({
         hint: "用户名已使用",
      })
   }
}
export const logout = async (req, res) => {
   let doc = await User.findOne({ _id: req.session.userId })
   doc.flag = false;
   doc.save(() => {
      req.session.destroy((err) => {
         res.json({
            hint: '已退出'
         })
      })
   })

}
