import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.asyncGet = promisify(this.client.get).bind(this.client);

    this.client.on('error', (error) => {
      console.log(`Redis client not connected to the server: ${error}`);
    });
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    const value = await this.asyncGet(key);
    return value;
  }

  async set(key, value, time) {
    this.client.set(key, value);
    this.client.expire(key, time);
  }

  del(key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
