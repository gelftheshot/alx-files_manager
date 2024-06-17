import { createClient } from 'redis'

class RedisClient { 
  constructor() {
    const client = createClient()
    .on('error', err => console.log('Redis Client Error', err))
    .connect();
  }

  isalive() {
    return this.client.isalive();
  }

  get (key) {
    return this.client.get.key
  }

  set (key, value, time) {
    this.client.set(key, value, 'EX', time)
  }

  del (key) {
    this.client.del(key)
  }
}

module.exports.RedisClient = redisClient;
