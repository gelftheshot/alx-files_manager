import express from 'express';
import routes from './routes/index';

const app = express();
const port = process.env.port || 5000;

routes(app);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
