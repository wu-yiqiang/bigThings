//导入加密库
const bcrypt = require('bcryptjs')
const db=require("../db/index")
exports.regUser=(req,res)=>{
	const userinfo=req.body
	/*处理账号和密码为空情况*/
/*	if(!userinfo.username||!userinfo.password){
		return res.cc("账号密码不能为空！！！",1)
	}*/


	//查询数据库
	let sql="select * from ev_users where username=?"
	db.query(sql,[userinfo.username,userinfo.password],function (err,results) {
		if(err) return res.cc(err.massage,1)
		if(results.length>0) return res.cc("用户名被占用！！！",1)

		//对用户密码进行加密处理
		userinfo.password = bcrypt.hashSync(userinfo.password, 10)
		/*将用户名和密码写入到数据库中*/
		var insertsql="insert into ev_users set ?"
		var userinfoobj={username:userinfo.username,password:userinfo.password}
		db.query(insertsql,userinfoobj,(err,results)=>{
			if(err) return res.cc(err.massage,1)

			//注册失败
			if(results.affectedRows!=1) return 	res.cc("注册失败",1)

			//注册用户成功
			res.cc("注册成功",0)
		})

	})
}


exports.login=(req,res)=>{
	const userinfo=req.body
	const selectsql="select * from ev_users where username=?"
	db.query(selectsql,userinfo.username,function (err,results) {
		if(err) return res.cc(err)
		if(results.length!==1) return res.cc("登陆失败！！！")
		const compareResult=bcrypt.compareSync(userinfo.password,results[0].password)
		if(!compareResult) return  res.cc("登录失败!!!")
		return res.cc("login ok")
	})



}