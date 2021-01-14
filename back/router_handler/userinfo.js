exports.getUserinfo=(req,res)=>{
	res.send("ok")
}

const  db=require("../db/index")
const sql="select id,username,nickname,email,user_pic from ev_users where id=?"
db.query(sql,req.user.id,(err,results)=>{

})