import mongoose from 'mongoose';
import config from './../common/config';
mongoose.connect(config.db_url, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;
db.once('open' ,()=>{
    console.log('连接数据库成功~~~');
});

db.on('error', (error)=>{
    console.error('连接数据库时发生错误: ' + error);
    //断开连接
    mongoose.disconnect();
});

db.on('close', function() {
    console.log('数据库断开，重新连接数据库');
    mongoose.connect(config.db_url, {useNewUrlParser: true, useUnifiedTopology: true});
});

export default db;