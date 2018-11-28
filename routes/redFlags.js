const express = require("express");
//const records = require("../routes/records");
//const users = require("records");
const router = express.Router();


const records = [
	{ 
		id : 1, 
		createdOn : Date.now,   
		createdBy : 1, // represents the user who created this record 
		type : "red-flag",       // [red-flag, intervention] 
		location : "Nigeria",   // Lat Long coordinates 
		status : "Resolved",     // [draft, under investigation, resolved, rejected] 
		comment : "My neighbour is a drug baron..." 
	},
	{ 
		id : 2, 
		createdOn : Date.now,   
		createdBy : 2, // represents the user who created this record 
		type : "intervention",       // [red-flag, intervention] 
		location : "Ghana",   // Lat Long coordinates 
		status : "Under investigation",     // [draft, under investigation, resolved, rejected] 
		comment : "we need government to help us..." 
	},
	{ 
		id : 3, 
		createdOn : Date.now,   
		createdBy : 3, // represents the user who created this record 
		type : "red-flag",       // [red-flag, intervention] 
		location : "Morocco",   // Lat Long coordinates 
		status : "draft",     // [draft, under investigation, resolved, rejected]  
		comment : "...abcde..." 
	}
	

];

router.get("/red-flags", (req, res) => {
	const record = records.filter(c => c.type === "red-flag");
	if (!record) res.status(404).send("Record not a red-flag Entry. Try ../red-flags");
	res.send(record);
});

router.get("/red-flags/:id", (req, res) => {
	const record = records.find(record => record.id === parseInt(req.params.id));
	if (!record) res.status(404).send("Record not available");
	else res.send(record);
});

// router.get("/red-flag/:id", (req, res) => {
// 	const record = records.find(record => record.id === parseInt(req.params.id));
// 	if (!record) res.status(404).send("Record not found");
// 	else res.send(
// 		{
// 			status: 200,
// 		});
// });

router.post("/red-flags", (req, res) => {
	const record = {
		id : records.length + 1, 
		createdOn : Date.now,   
		createdBy : records.length + 1, // represents the user who created this record 
		type : "red-flag",       // [red-flag, intervention] 
		location : req.body.location,   // Lat Long coordinates 
		status : "draft",     // [draft, under investigation, resolved, rejected]  
		comment : req.body.comment
	};
	records.push(record);
	res.send(record);
});

router.put("/red-flags/:id/location", (req, res) => {
	//look up the course and validate
	const record = records.find(c => c.id === parseInt(req.params.id));
	//if invalid return 404
	if (!record || (record.type !== "red-flag")) res.status(404).send("Record not a red-flag Entry. check ../red-flags");
	//else Update the course
	else record.location = req.body.location;
	//Return the updated course
	res.send(record);
});

router.put("/red-flags/:id/comment", (req, res) => {
	//look up the course 
	const record = records.find(c => c.id === parseInt(req.params.id));
	//if not existing return 404
	if (!record) res.status(404).send("Record doesn't exist");	
	//validate the course if invalid return 404 - Bad request
	//else Update the course
	else record.comment = req.body.comment;
	//Return the updated course
	res.send(record);
});

router.delete("/red-flags/:id", (req, res) => {
	//check if record with specific id exists
	const record = records.find( c => c.id === parseInt(req.params.id));
	//if not return eror message
	if (!record) res.status(404).send("Record doesn't exist");	
	//else delete specific record
	const specificRecord = records.indexOf(record);
	records.splice(specificRecord, 1);
	//display deleted record
	record.status = "deleted";
	res.send(record);
});

module.exports = router;
