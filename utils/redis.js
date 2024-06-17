import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient()
      .on('error', err => console.log('Redis Client Error', err));
    this.client.connect();
  }

  isAlive() {
    return new Promise((resolve, reject) => {
      this.client.ping((error, reply) => {
        if (error) {
          reject(error);
        } else {
          resolve(reply === 'PONG');
        }
      });
    });
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (error, reply) => {
        if (error) {
          reject(error);
        } else {
          resolve(reply);
        }
      });
    });
  }

  async set(key, value, time) {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, 'EX', time, (error, reply) => {
        if (error) {
          reject(error);
        } else {
          resolve(reply);
        }
      });
    });
  }

  del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (error, reply) => {
        if (error) {
          reject(error);
        } else {
          resolve(reply);
        }
      });
    });
  }
}

module.exports.RedisClient = redisClient;