import { createClient } from 'redis'

class RedisClient { 
  constructor() {
    const client = createClient()
    .on('error', err => console.log('Redis Client Error', err))
    .connect();
  }

  isalive() {
    return new Promise((resolve, reject) => {
      this.client.ping((error, replay) => {
        if (error) {
          reject(error);
        } else {
          resolve(replay === 'PONG');
        }
      });
    })
  }

  async get (key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (error, replay) => {
        if (error){
          reject(error);
        } else {
          resolve(replay);
        }
      });
    });
  }

  async set (key, value, time) {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, 'EX', time, (error, replay) => {
        if (error) {
          reject(error);
        } else {
          resolve(replay);
        }
      })
    });
  }

  del (key) {
    return new Promise((resolve, reject) => { 
      this.client.del(key, (replay, error) => {
        if (error){
          reject(error);
        } else {
          resolve(replay);
        }
      });
     });
  }
}

module.exports.redisClient = RedisClient;
