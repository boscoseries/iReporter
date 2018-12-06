import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';


const app = express();

app.use(bodyParser.json());

app.use(routes);

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
	console.log(`Listening on port ${port} ...`);
});

export default app;