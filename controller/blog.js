const { exec } = require('../db/mysql')

const xss = require('xss')

const getList = (author, keyword) => {
    
    let sql = `select * from blog where 1=1 `
    if(author){
        sql += `and author='${author}' `
    }
    if (keyword){
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`
    return exec(sql)
}

const  getDetail = (id) => {
    
    let sql = `select * from blog where id='${id}';`
    return exec(sql).then(rows => {
        return rows[0]
    })
    
}

const newBlog = (blogData = {}) => {
  //  console.log(blogData)
    
    const title = xss(blogData.title)
    const content = blogData.content
    const createTime = Date.now()
    const author = blogData.author

    const sql = `
        insert into blog (title, content, createtime, author) 
        values ('${title}', '${content}', '${createTime}', '${author}');
    `

    return exec(sql).then(insertData => {
        //console.log(insertData)
        return {
            id: insertData.insertId
        }
    })

}

const updateBlog = (id, blogData = {}) => {

    const title = blogData.title
    const content = blogData.content

    const sql = `
        update blog set title='${title}', content='${content}' where id=${id};
    `
    return exec(sql).then(updateData => {
        //console.log(updateData)
        if(updateData.affectedRows > 0){
            return true
        }
        return false
    })

}

const delBlog = ( id,author ) => {
    
    const sql = `
    DELETE FROM blog where id=${id} and author='${author}';
    `
    return exec(sql).then(deleteData => {
        
        if(deleteData.affectedRows > 0){
            return true
        }
        return false
    })

    //return true
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}