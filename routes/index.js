import { Router } from 'express';
import { getStats, getStatus } from '../controllers/AppController';

const routes = Router();

routes.get('/status', (req, res) => {
  const status = getStatus();
  res.send(status)
});

routes.get('//stats', (req, res) => {
  const stats = getStats;
  res.send(stats);
});
