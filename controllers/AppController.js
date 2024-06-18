import {express} from 'express';
import { dbClient } from '../utils/db';
import { redisClient } from '../utils/redis';

async function getStatus (req, res) {
  res.status(200).json({ "redis": redisClient.isAlive(), "db": dbClient.isAlive() });
}

async function getStats (req, res) {
  res.status(200).json({ 'users' : dbClient.nbUsers(), 'files' : dbClient.nbFiles() });
}
