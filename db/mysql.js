const MYSQL_CONF = require('../conf/db')

const mysql = require('mysql')

// bug wait to be fixed
// const con = mysql.createConnection(MYSQL_CONF)

//console.log(MYSQL_CONF)

// hard code para
const con = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'myblog'
})

con.connect()

function exec(sql){
    const promise =  new Promise((resolve, reject) => {
        con.query(sql,(err,result)=>{
            if(err){
                reject(err)
                return 
            }
            resolve(result)
        })
    }
    )
    return promise
}

module.exports = {exec}




