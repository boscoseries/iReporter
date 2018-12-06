import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';


const app = express();

app.use(bodyParser.json());

app.use(routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Listening running on port ${port} ...`);
});

export default app;