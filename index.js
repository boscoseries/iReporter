import express from 'express';
import bodyParser from 'body-parser';
import redFlags from './routes/redFlags';
import Users from './routes/users';
import home from './routes/index';


const app = express();

app.use(bodyParser.json());

app.use("/", home);
app.use("/api/v1", Users);
app.use("/api/v2", redFlags);

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Listening running on port ${port} ...`);
});

export default app;