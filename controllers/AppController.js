import { dbClient } from '../utils/db';
import { redisClient } from '../utils/redis';

export async function getStatus(req, res) {
  res.status(200).json({ "redis": redisClient.isAlive(), "db": dbClient.isAlive() });
}

export async function getStats(req, res) {
  const usersCount = await dbClient.nbUsers();
  const filesCount = await dbClient.nbFiles();
  res.status(200).json({ 'users': usersCount, 'files': filesCount });
}
