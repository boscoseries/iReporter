const express = require("express");

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

// Get all Red-flag records
router.get("/red-flags", (req, res) => {
	const record = records.filter(c => c.type === "red-flag");
	if (!record) res.status(404).json({status: 404, error: "Not the correct path. Try checking /red-flags"});
	res.status(200).json({status: 200, data: record});
});

// fetch a specific Red-flag records
router.get("/red-flags/:id", (req, res) => {
	const record = records.find(c => c.id === parseInt(req.params.id));
	if (!record) res.status(404).json({status: 404, error: "Record not available"});
	res.status(200).json({status: 200, data: record});
});

// Create a red flag record
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
	res.status(200).json({status: 200, data: record});
});

// edit the location of a red flag record
router.put("/red-flags/:id/location", (req, res) => {
	//look up the course and validate
	const record = records.find(c => c.id === parseInt(req.params.id));
	//if invalid return 404
	if (!record || (record.type !== "red-flag")) res.status(404).json({status: 404, error: "Record not a red-flag Entry. check ./red-flags for entry types"});
	record.location = req.body.location;
	res.status(200).json({status: 200, data: record});
});

// edit the comment of a red flag record
router.put("/red-flags/:id/comment", (req, res) => {
	//check if record with specific id exists
	const record = records.find(c => c.id === parseInt(req.params.id));
	//if invalid return 404
	if (!record || (record.type !== "red-flag")) res.status(404).json({status: 404, error: "Record not a red-flag Entry. check ./red-flags for entry types"});
	record.comment = req.body.comment;
	res.status(200).json({status: 200, data: record});
});

router.delete("/red-flags/:id", (req, res) => {
	//check if record with specific id exists
	const record = records.find( c => c.id === parseInt(req.params.id));
	//if not return eror message
	if (!record) res.status(404).json({status: 404, error: "Record doesn't exist"});
	if (!record) res.status(404).json({status: 404, error: "Record not a red-flag entry. check ./red-flags for entry types"});
	//else delete specific record
	const specificRecord = records.indexOf(record);
	records.splice(specificRecord, 1);
	//change status of deleted record and display record
	record.status = "deleted";
	res.status(200).json({status: 200, data: record});
});


module.exports = router;
