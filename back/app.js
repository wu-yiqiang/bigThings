//导入express模块
const express=require("express")
const app=express()
//导入cros模块
const cors=require("cors")
//导入mysql模块
//导入路由模块
const router=require("./router/user")


//配置cors跨域
app.use(cors())
//配置解析表单数据中间件只解析application格式数据
app.use(express.urlencoded({ extended: false }))
//app.use(express.json)



//配置数据响应中间件
app.use(function (req,res,next) {
	res.cc=function(err,status=1){
		res.send({
			status,
			message:err instanceof Error? err.message:err
		})
	}
	next()
})

//路由
app.use("/api",router)

const joi=require("@hapi/joi")
app.use(function (err,req,res,next) {
	if(err instanceof joi.ValidationError) return res.cc(err)
	res.cc(err)
})




//启动服务器
app.listen(3000,()=>{
	console.log("server is Starting on 127.0.0.1:3000")
})