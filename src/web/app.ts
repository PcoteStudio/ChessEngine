import express from 'express';
import pug from 'pug';
import path from 'path';

const app = express();
app.set('views', path.join(process.cwd(), 'src/web/views'));
app.set('view engine', 'pug');

app.get('/', (req: any, res: any) => {
  res.render('index', { title: 'Home' });
});

export { app };
