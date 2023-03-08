const redis = require('redis')
const REDIS_CONF = require('../conf/db')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

// 监听错误信息
redisClient.on('err', err => {
  console.log('redis client error: ', err)
})

module.exports = redisClient