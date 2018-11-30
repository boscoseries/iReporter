const express = require("express");
const redFlags = require("./routes/redFlags");
const Users = require("./routes/users");
const home = require("./routes/index");


const app = express();

app.use(express.json());

app.use("/", home);
app.use("/api/v1", Users);
app.use("/api/v2", redFlags);

const port = process.env.PORT || 3000;
let server = app.listen(port, (req, res) => {
	console.log(`Listening running on port ${server.address().port} ...`);
});

module.exports = server;