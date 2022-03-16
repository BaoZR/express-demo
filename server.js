
/**
 * 在上面的代码中，我们首先用 express() 函数创建一个 Express 服务器对象，
 * 然后用上面提到的路由定义方法 app.get 定义了主页 / 的路由，
 * 最后同样调用 listen 方法开启服务器。
 */
const   express = require('express')

const indexRouter = require('./routes/index')
const apiRouter = require('./routes/api')

const hostname = 'localhost';
const port = 3000;

const app = express();

// 指定模板存放目录
app.set('views', 'views');

// 指定模板引擎为 Handlebars
app.set('view engine', 'hbs');

function loggingMiddleware(req, res, next){
    const time = new Date();
    console.log(`[${time.toLocaleString()}] ${req.method} ${req.url}`);
    next();
}

//这个use要放在前面
app.use(loggingMiddleware);
//静态数据
app.use(express.static('public'));

//注册路由
app.use("/",indexRouter)
app.use('/api',apiRouter)

app.get('/broken',(req, res) => {
    throw new Error('Broken')
})


//在 server.js 所有路由的后面添加
app.use('*',(req,res) =>{
    res.status(404).render('404',{url:req.originalUrl})
})

app.use((err, req, res, next) => {
    res.status(500).render('500');
})

app.listen(port,()=>{
    console.log(`Server running at http://${hostname}:${port}/`);
})






