const express = require("express");
const app = express();

app.get("/", (req, res) => {
	res.send(
		"Affirmative"
	);
});

const port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
	console.log(`Server running on port ${port}`);
});