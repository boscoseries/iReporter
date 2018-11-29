const express = require("express");
const router = express.Router();


const Users = [
	{ 
		id : 1,  
		firstname : "Jerry", 
		lastname : "Gana", 
		othernames : "Mensah", 
		email : "jgana@gmail.com", 
		phoneNumber : "08096793276", 
		username : "jgana",  
		registered : Date().toString(), 
		isAdmin : false, 
	},

	{ 
		id : 2,  
		firstname : "Peter", 
		lastname : "Duru", 
		othernames : "John", 
		email : "pduru@gmail.com", 
		phoneNumber : "07066793222", 
		username : "jpeterduru",  
		registered : Date().toString(), 
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
		registered : Date().toString(), 
		isAdmin : true, 
	}
];

// fetch all Users
router.get("/users", (req, res) => {
	const user = Users.filter(c => c.isAdmin === false);
	if (!user) res.status(404).json({status: 404, error: "Page not found!"});
	res.status(200).json({status: 200, data: user});
});


module.exports = router;