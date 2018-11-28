//const express = require("express");
//const router = express.Router();


const User = [
	{ 
		id : 1,  
		firstname : "Jerry", 
		lastname : "Gana", 
		othernames : "", 
		email : "jgana@gmail.com", 
		phoneNumber : "08096793276", 
		username : "jgana",  
		registered : Date.now, 
		isAdmin : false, 
	},

	{ 
		id : 2,  
		firstname : "Peter", 
		lastname : "Duru", 
		othernames : "", 
		email : "pduru@gmail.com", 
		phoneNumber : "07066793222", 
		username : "jpeterduru",  
		registered : Date.now, 
		isAdmin : false, 
	},

	{ 
		id : 3,  
		firstname : "Mike", 
		lastname : "Osumah", 
		othernames : "Mo", 
		email : "michaul@gmail.com", 
		phoneNumber : "08055907608", 
		username : "mosumah",  
		registered : Date.now, 
		isAdmin : true, 
	}
];

//module.exports = router;