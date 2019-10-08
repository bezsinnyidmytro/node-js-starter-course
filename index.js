const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/', async (ctx, next) => {
  ctx.body = 'HOME';
  next();
});

router.get('/register', async (ctx, next) => {
  ctx.body = 'REGISTER';
  next();
});

router.post('/user', async (ctx, next) => {
  let arr = [];

  await new Promise((resolve, reject) => {
    ctx.req.on('data', async (data) => {
      arr.push(data);
    });

    ctx.req.on('end', async () => {
      console.log(arr);
      console.log(JSON.parse(arr));

      ctx.body = JSON.parse(arr);
      resolve();
    });
  });

  next();
});

const port = 3003;

app.use(router.routes());

app.listen(port);
console.log(`Server is listening port ${port}`);
