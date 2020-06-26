import User from '../models/User'
export const getAddress = async (req, res) => {
    if (req.session.userId) {
       let doc = await User.findOne({ _id: req.session.userId }, { receiverAdd: 1 });
       let receiver = JSON.parse(JSON.stringify(doc.receiverAdd).replace(/_id/g, "id"));
       res.json({
          data: receiver
       })
    } else {
       res.json({
          hint: '没有登陆'
       })
    }
 }
export const addAddress = async (req, res) => {
    delete req.body.id
    console.log(req.body);
    if (req.session.userId) {
       let doc = await User.findOne({ _id: req.session.userId }, { receiverAdd: 1 })
       if (req.body.isDefault) {
          doc.receiverAdd.forEach(arr => arr.isDefault = false)
       }
       doc.receiverAdd.unshift(req.body)
       doc.save((err, result) => {
          if (err) throw err
          res.json({
             data: JSON.parse(JSON.stringify(result.receiverAdd).replace(/_id/g, "id"))
          })
       })
    } else {
       res.json({
          hint: '没有登陆'
       })
    }
 }
export const updataAddress = async (req, res) => {
    if (req.session.userId) {
       let doc = await User.findOne({ _id: req.session.userId }, { receiverAdd: 1 })
       if (req.body.isDefault) {
          doc.receiverAdd.forEach(arr => arr.isDefault = false)
       }
       let index = doc.receiverAdd.findIndex(arr => arr._id == req.body.id);
       delete req.body.id
       doc.receiverAdd[index] = req.body;
       doc.save((err, result) => {
          if (err) throw err
          res.json({
             data: JSON.parse(JSON.stringify(result.receiverAdd).replace(/_id/g, "id"))
          })
       })
    } else {
       res.json({
          hint: '没有登陆'
       })
    }
 }
export const delAddress = async (req, res) => {
    if (req.session.userId) {
       let doc = await User.findOne({ _id: req.session.userId }, { receiverAdd: 1 })
       let index = doc.receiverAdd.findIndex(arr => arr._id == req.body.id);
       doc.receiverAdd.splice(index, 1);
       doc.save((err, result) => {
          if (err) throw err
          res.json({
             data: JSON.parse(JSON.stringify(result.receiverAdd).replace(/_id/g, "id"))
          })
       })
    } else {
       res.json({
          hint: '没有登陆'
       })
    }
 }
