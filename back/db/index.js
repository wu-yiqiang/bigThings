const  mysql=require("mysql")
const db=mysql.createPool({
	host:"127.0.0.1",
	port:"3306",
	user:"root",
	password:"magicbook",
	database:"my_db_01",
})


module.exports=db