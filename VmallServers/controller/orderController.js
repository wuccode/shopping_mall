import User from '../models/User'
export const getObligation = async (req, res) => {
    if (req.session.userId) {
       let doc = await User.findOne({ _id: req.session.userId }, { obligation: 1 })
       if (doc.obligation.length >= 1) {
          if (req.query.serial) {
             res.json({
                data: doc.obligation.filter(arr => arr.serial === req.query.serial),
                success_code: true
             })
          } else {
             res.json({
                data: doc.obligation,
                success_code: true
             })
          }
       } else {
          res.json({
             success_code: false
          })
       }
 
 
    } else {
       res.json({
          hint: '没有登陆'
       })
    }
 }
export const addObligation = async (req, res) => {
   if (req.session.userId) {
      let doc = await User.findOne({ _id: req.session.userId }, { obligation: 1 })
      doc.obligation.unshift({
         serial: req.body.serial,
         allPrice: req.body.allPrice,
         count: req.body.count,
         goods: req.body.goods,
         time: req.body.time,
         shipping: req.body.shipping
      })
      doc.save((err, result) => {
         res.json({
            hint: '提交成功'
         })
      })
   } else {
      res.json({
         hint: '没有登陆'
      })
   }
}
export const delObligation = async (req, res) => {
   if (req.session.userId) {
      let doc = await User.findOne({ _id: req.session.userId }, { obligation: 1 })
      let index = doc.obligation.findIndex(arr => arr._id == req.body.id);
      doc.obligation.splice(index, 1);
      doc.save((err, result) => {
         if (err) throw err
         res.json({
            data: result.obligation,
            obligationTh: result.obligation.length
         })
      })
   } else {
      res.json({
         hint: '没有登陆'
      })
   }
}
export const addWaitReceiving = async (req, res) => {
   if (req.session.userId) {
      let doc = await User.findOne({ _id: req.session.userId }, { obligation: 1, waitReceiving: 1 })
      let index = doc.obligation.findIndex(arr => arr._id == req.body.id);
      let add = doc.obligation.splice(index, 1);
      delete add._id
      delete add[0].time
      delete add[0]._id
      doc.waitReceiving.unshift(add[0])
      doc.save((err, result) => {
         if (err) throw err
         res.json({
            data: result.waitReceiving,
            // obligationTh:result.obligation.length
         })
      })
   } else {
      res.json({
         hint: '没有登陆'
      })
   }
}
export const getWaitReceiving = async (req, res) => {
   if (req.session.userId) {
      let doc = await User.findOne({ _id: req.session.userId }, { waitReceiving: 1 })
      if (doc.waitReceiving.length >= 1) {
         res.json({
            data: doc.waitReceiving,
            success_code: true
         })
      } else {
         res.json({
            success_code: false
         })
      }
   } else {
      res.json({
         hint: '没有登陆'
      })
   }
}
export const addEvaluate = async (req, res) => {
   if (req.session.userId) {
      let doc = await User.findOne({ _id: req.session.userId }, { evaluate: 1, waitReceiving: 1 })
      let index = doc.waitReceiving.findIndex(arr => arr._id == req.body.id);
      let add = doc.waitReceiving.splice(index, 1);
      doc.evaluate.unshift(add[0])
      doc.save((err, result) => {
         if (err) throw err
         res.json({
            evaluate: result.evaluate,
            waitReceiving: result.waitReceiving
         })
      })
   } else {
      res.json({
         hint: '没有登陆'
      })
   }
}
export const getEvaluate = async (req, res) => {
   if (req.session.userId) {
      let doc = await User.findOne({ _id: req.session.userId }, { evaluate: 1 })
      if (doc.evaluate.length >= 1) {
         res.json({
            data: doc.evaluate,
            success_code: true
         })
      } else {
         res.json({
            success_code: false
         })
      }
   } else {
      res.json({
         hint: '没有登陆'
      })
   }
}
export const getCompleted = async (req, res) => {
   if (req.session.userId) {
      let doc = await User.findOne({ _id: req.session.userId }, { completed: 1 })
      if (doc.completed.length >= 1) {
         res.json({
            data: doc.completed,
            success_code: true
         })
      } else {
         res.json({
            success_code: false
         })
      }
   } else {
      res.json({
         hint: '没有登陆'
      })
   }
}

export const addCompleted = async (req, res) => {
   if (req.session.userId) {
      let doc = await User.findOne({ _id: req.session.userId })
      let add = {};
      let pos = doc.evaluate.findIndex(arr => arr.serial == req.body.serial)
      let order = doc.evaluate[pos];
      add = order.goods.splice(order.goods.findIndex(arr => arr._id == req.body.id),1)[0]
      doc.evaluate[pos].allPrice -= add.price * add.count
      doc.evaluate[pos].count -= add.count
      if(doc.evaluate[pos].count === 0){         
         doc.evaluate.splice(pos,1)
      }
      let index = doc.completed.findIndex(arr => arr.serial == order.serial);
      if (index !== -1) {
         doc.completed[index].goods.push(add)
         doc.completed[index].allPrice += add.price * add.count 
         doc.completed[index].count += add.count 
      } else {
         doc.completed.unshift({
            serial: order.serial,
            count: add.count,
            allPrice: add.price * add.count,
            goods:[add],
            shipping: { address: order.shipping.address, name: order.shipping.name, tel: order.shipping.tel}
         }
         )
      }
      doc.save((err,result)=>{
         if(err) throw err
         res.json({
            completed : result.completed
         })
         
      })
   } else {
      res.json({
         hint: '没有登陆'
      })
   }
}
export const delCompleted = async (req, res) => {
   if (req.session.userId) {
      let doc = await User.findOne({ _id: req.session.userId }, { completed: 1 })
      let index = doc.completed.findIndex(arr => arr._id == req.body.id);
      doc.completed.splice(index, 1);
      doc.save((err, result) => {
         if (err) throw err
         res.json({
            data: result.completed,
            completedTh: result.completed.length
         })
      })
   } else {
      res.json({
         hint: '没有登陆'
      })
   }
}
