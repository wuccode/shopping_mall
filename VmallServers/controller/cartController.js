import User from '../models/User'
export const addCart = async (req, res) => {
    let { id, title, color, size, img, price, type} = req.body
    let doc = await User.findOne({ _id: req.session.userId }, { cart: 1 })
    if (doc) {
        let index = doc.cart.findIndex(arr => arr.goods === title);
        let num = 0;
        doc.cart.forEach(arr => num += arr.count)
        if (index !== -1) {
            doc.cart[index].count++;
            doc.save((err, result) => {
                if (err) throw err
                res.json({
                    hint: "商品加一个",
                    success_code: 200,
                    count: num + 1
                })
            })
        } else {
            doc.cart.push({
                price: price,
                discountPrice: 0,
                goods: title,
                model: color + ',' + size + ',' + type,
                count: 1,
                img: img,
                particularId: id
            })
            doc.save((err, result) => {
                if (err) throw err
                res.json({
                    hint: "添加一个新商品",
                    success_code: 200,
                    count: num + 1
                })
            })
        }
    } else {
        res.json({
            hint: "未登录",
            success_code: 401
        })
    }
}
export const getCart = async (req, res) => {
    let doc = await User.findOne({ _id: req.session.userId }, { cart: 1 });
    if (doc) {
       res.json({
          data: doc,
          success_code: 200
       })
    } else {
       res.json({
          hint: '没有登陆',
          success_code: 401
       })
    }
 }
export const allSelect = async (req, res) => {
    let doc = await User.findOne({ _id: req.session.userId }, { cart: 1 });
    if (doc) {
       doc.cart.forEach(arr => arr.checked = req.body.value);
       doc.save(()=>{
          res.json({
             hint: '成功'
          })
       }) 
    }else{
       res.json({
          hint: '失败'
       })
    }
 }
export const updateCart = async (req, res) => {
    let doc = await User.findOne({ _id: req.session.userId }, { cart: 1 });
    if (doc) {
       let index = doc.cart.findIndex(arr=> arr._id == req.body.id);
       doc.cart[index][req.body.key] = req.body.value         
       doc.save(()=>{
          res.json({
             hint: '成功'
          })
       }) 
    }else{
       res.json({
          hint: '失败'
       })
    }
 }
export const delCart =  async (req, res) => {
    let doc = await User.findOne({ _id: req.session.userId }, { cart: 1 });
    if (doc) {
       req.body.arrId.forEach(id => {
          let index = doc.cart.findIndex(goods => goods._id == id)
          if(index !== -1){
             doc.cart.splice(index,1)               
          }         
       })       
       doc.save(()=>{
          res.json({
             hint: '成功'
          })
       }) 
    }else{
       res.json({
          hint: '失败'
       })
    }
 }
