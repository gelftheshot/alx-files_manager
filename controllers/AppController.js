import RedisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
  static getStatus(request, response) {
    const status = {
      redis: RedisClient.isAlive(),
      db: dbClient.isAlive(),
    };
    return response.status(200).send(status);
  }

  static async getStats(request, response) {
    const stats = {
      users: await dbClient.nbUsers(),
      files: await dbClient.nbFiles(),
    };
    return response.status(200).send(stats);
  }
}

module.exports = AppController;
