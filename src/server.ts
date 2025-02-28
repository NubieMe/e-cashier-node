import express from 'express';
import * as db from './database';
import cors from 'cors';
import router from './route';
import { errorHandler } from './middleware/error-handler';

export const app = express();
const port = process.env.PORT || 3000

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api', router);
app.use(errorHandler);

app.listen(port, () => {
    db.connect();
    console.log(`Server running on port ${port}`)
})