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

// fetch all Red-flag records
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


module.exports = router;
