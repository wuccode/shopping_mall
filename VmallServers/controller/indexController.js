import Commodity from './../models/Commodity'
import Particular from '../models/Particular'
import Goods from '../models/Goods'
import User from '../models/User'
import path from 'path'
import moment from 'moment'
import multer from 'multer';
import fs from 'fs'
//首页
export const home = async (req, res) => {
   const doc = await Commodity.findOne({}, { _id: 0, __v: 0 })
   if (doc) {
      res.json({
         status: 200,
         success: true,
         data: doc.toJSON()
      })
   } else {
      res.end({
         success: false
      })
   }
}
//详情
export const particular = async (req,res)=>{ 
    let doc = await Particular.findOne({_id:req.query.id},{ __v: 0, comment:0})
    if (doc) {
     res.json({
        status: 200,
        success: true,
        data: doc.toJSON()
     })
  } else {
     res.json({
        success: false
     })
  }   
}
//评论
export const comment = async (req, res) => {
   let {skip,limit,id} = req.query
   let doc = await Particular.findOne({_id:id},{comment:1});
   let good = doc.comment.reduce((num,arr)=>arr.star == 5 ? ++num : num,0);
   let reputation = Math.round((good / doc.comment.length) * 100) + '%';   
   let filterDoc = doc.comment.reverse().filter((arr,index)=> index >= skip && index < limit);
   if(filterDoc.length > 0){      
      res.json({
         data:filterDoc,
         length:doc.comment.length,
         reputation:reputation
      }) 
   }else{
      res.json({
         data:'没有更多了'
      }) 
   }
}
export const mine = async (req, res) => {
   if (req.session.userId) {
      let doc = await User.findOne({ _id: req.session.userId }, { _id: 0, __v: 0 })
      if (doc) {
         res.json({
            user: doc.user,
            photo: doc.photo,
            obligationTh: doc.obligation.length,
            waitReceivingTh: doc.waitReceiving.length,
            evaluateTh: doc.evaluate.length,
            completedTh:doc.completed.length,
            hint: '已登陆'
         })
      }
   } else {
      res.json({
         hint: '没有登陆'
      })
   }

}
export const goodsSeek = async (req, res) => {
   let { index } = req.query, newDoc = [];
   let docs = await Goods.find({ affiliation: index }, { __v: 0 })
   docs.map(arr => newDoc.push(arr.series))
   if (docs.length > 0) {
      res.json({
         data: docs,
         series: [...new Set(newDoc)]
      })
   } else {
      res.json({
         success: false
      })
   }

}
export const upload = multer({ dest: path.join(__dirname, '../public/update/comment') });
export const addComment = async (req, res) => {
   if (!req.session.userId) {
      res.json({ hint: '没有登陆' })
      return
   }
   var file = req.files;
   let site = []
   file.forEach((arr) => {
      let newName = arr.originalname.split('.');
      fs.rename(arr.path, arr.path + '.' + newName[newName.length - 1], (err) => {
         if (err) throw err
      })
      site.push('/update/comment/' + arr.filename + '.' + newName[newName.length - 1])
   })
   let user = await User.findOne({ _id: req.session.userId })
   let doc = await Particular.findOne({ _id: req.body.particularId })
   doc.comment.push({
      userName: user.user,
      date: moment(new Date).format('YYYY-MM-DD'),
      content: req.body.value,
      star: req.body.star,
      modelNumber: req.body.model,
      Img: site,
      Like: 0,
      photo: user.photo
   })
   doc.save((err, result) => {
      if (err) throw err
      res.json({
         success_code: 200,
         data: result
      })

   })
}
