import getApp from './server'
import morgan from 'morgan'

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = getApp({top:[morgan('dev')]})

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
