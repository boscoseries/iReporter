import express from 'express';
import env from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';

env.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use(routes);

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
	console.log(`Listening on port ${port} ...`);
});

export default app;