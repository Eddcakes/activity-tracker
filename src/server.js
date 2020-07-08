import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import { json } from 'body-parser';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

//https://github.com/lukeed/polka/tree/master/packages/send-type
// prob want authorisation for api?espec post

const app = polka(); // You can also use Express

app.use(
  json(),
  compression({ threshold: 0 }),
  sirv('static', { dev }),
  sapper.middleware()
);

app.listen(PORT, (err) => {
  if (err) console.log('error', err);
});
