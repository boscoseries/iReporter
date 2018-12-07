const pg = require("pg");
const connectionString = process.env.DATABASE_URL;

dotenv.config();

const client = new pg.Client(connectionString);
client.connect();
