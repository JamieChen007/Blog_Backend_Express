const { escape } = require('mysql')
const { exec } = require('../db/mysql')
const { genPassword } = require('../utils/crypt')

const userlogin = (username,password) => {
    username = escape(username)
    
    password = genPassword(password)
    password = escape(password) 
    
    let sql
    
    sql = `select username,realname from user where username=${username} and password=${password};`

    return exec(sql).then(rows => {
        return rows[0] || {}
    })
}

module.exports = { userlogin }