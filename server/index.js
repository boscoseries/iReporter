import dotenv from 'dotenv'
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use(cors());

app.use(routes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`Listening on port ${port} ...`);
});

export default app;