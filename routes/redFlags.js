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
	if (!record) res.status(404).send("Record not a red-flag Entry. Try ../red-flags");
	res.send(record);
});


module.exports = router;
