const express = require("express");

const router = express.Router();

const records = [
	{ 
		id : 1, 
		createdOn : Date().toString(),   
		createdBy : 1,
		type : "red-flag",
		location : "Latitude: 6.6636025, Longitude: 3.289491",
		status : "Resolved",
		Image :	["fight.jpg", "my_img.jpg"],
		Video :	["my_vid.mp4"],
		comment : "My neighbour is a drug baron..." 
	},
	{ 
		id : 2, 
		createdOn : Date().toString(),   
		createdBy : 2, 
		type : "intervention", 
		location : "Latitude: 10.37976522, Longitude: 2.57080078",
		status : "Under investigation",
		Images :	["my_view.jpg", "chair.jpg"],
		Videos :	["harps.mp4"],
		comment : "we need government to help us..." 
	},
	{ 
		id : 3, 
		createdOn : Date().toString(),   
		createdBy : 3, 
		type : "red-flag", 
		location : "Latitude: 7.59913068, Longitude: 2.99902344",
		status : "draft",
		Images :	["house.jpg"],
		Videos :	["event.mp4"],
		comment : "...abcde..." 
	}
];

// fetch homepage
router.get("/", (req, res) => {
	res.status(200).json(
		"Welcome to my API"
	);
});

// fetch all records
router.get("/records", (req, res) => {
	res.status(200).json({status: 200, data: records});
});


module.exports = router;