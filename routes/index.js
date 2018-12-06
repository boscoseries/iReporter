import express from "express";

//import records from "../routes/records";

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

// fetch homepage
router.get("/", (req, res) => {
	res.status(200).json(
		"Welcome to my API"
	);
});

router.get("/api/records", (req, res) => {
	res.send(records);
});


export default router;