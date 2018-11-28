var express = require("express");
var redFlags = require("./routes/redFlags");
var home = require("./routes/index");


var app = express();

app.use(express.json());

app.use("/", home);
app.use("/api/v1", redFlags);

var port = process.env.PORT || 3000;
let server = app.listen(port, (req, res) => {
	console.log(`Listening running on port ${server.address().port} ...`);
});

module.exports = server;