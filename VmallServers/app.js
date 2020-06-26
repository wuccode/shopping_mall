import express from 'express';
import './db/db';
import {join} from 'path';
import nunjucks from 'nunjucks';
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import session from 'express-session'
import config from './common/config'
let app = express();
//引入路由
import indexRouter from './routes/index';

// 1. 配置公共资源访问路径
app.use(express.static(join(__dirname,'public')))
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: config.secret,
  name: config.name,
  resave:false,
  saveUninitialized:true,
  cookie:{maxAge:config.maxAge },
}));
// 2. 配置中间件（nunjucks模板引擎能够作用到views文件夹中的模板）
nunjucks.configure(join(__dirname, 'views'), {
    autoescape: true,
    express: app,
});
app.set('view engine', 'html');
app.all('*', (req, res, next)=> {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});



app.use(indexRouter)



app.use((req,res)=>res.render('404.html'))

app.listen(config.port,()=>console.log(`端口为${config.port}的服务器已开启`))
