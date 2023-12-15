import { app } from './web/app';
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`[Server]: Server is running at http://localhost:${port}`);
});
