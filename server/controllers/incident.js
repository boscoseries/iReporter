const records = [{
    id: 1,
    createdOn: Date().toString(),
    createdBy: 1,
    type: "red-flag",
    location: "Latitude: 6.6636025, Longitude: 3.289491",
    status: "Resolved",
    Image: ["fight.jpg", "my_img.jpg"],
    Video: ["my_vid.mp4"],
    comment: "My neighbour is a drug baron..."
  },
  {
    id: 2,
    createdOn: Date().toString(),
    createdBy: 2,
    type: "intervention",
    location: "Latitude: 10.37976522, Longitude: 2.57080078",
    status: "Under investigation",
    Images: ["my_view.jpg", "chair.jpg"],
    Videos: ["harps.mp4"],
    comment: "we need government to help us..."
  },
  {
    id: 3,
    createdOn: Date().toString(),
    createdBy: 3,
    type: "red-flag",
    location: "Latitude: 7.59913068, Longitude: 2.99902344",
    status: "draft",
    Images: ["house.jpg"],
    Videos: ["event.mp4"],
    comment: "...abcde..."
  }
];

const getIncidents = (req, res) => {
  const record = records.filter(c => c.type === "red-flag");
  if (!record) res.status(404).json({
    status: 404,
    error: "Not the correct path. Try /red-flags"
  });

  res.status(200).json({
    status: 200,
    data: record
  });
};

const getIncident = (req, res) => {
	const record = records.find(
		c => c.id === parseInt(req.params.id)
	);
	if (!record  || (record.type !== "red-flag")) res.status(404)
	.json({
		status: 404, 
		error: "Record not a red-flag"});
	res.status(200)
	.json({status: 200, 
		data: record
	});
};

const createIncident = (req, res) => {
	const record = {
		id : records.length + 1, 
		createdOn : Date.now,   
		createdBy : records.length + 1, 
		type : "red-flag", 
		location : req.body.location || "Not provided",
		status : "draft",  
		comment : req.body.comment || "Not provided"
	};
	records.push(record);
	res.status(200).json({ status: 200, data: [
		{ id: record.id, 
			message: "Created red-flag record"
		}]
	});
};

const updateLocation = (req, res) => {
	//check if user with specific id exists
	const record = records.find(
		c => c.id === parseInt(req.params.id)
	);
	//if invalid return 404
	if (!record || (record.type !== "red-flag")) 
	res.status(404)
		.json({status: 404, 
				error: "Record not a red-flag Entry."
		});
	record.location = req.body.location || "Not provided";
	res.status(200)
		.json({ 
			status: 200, 
			data: [
		  	{ 	id: record.id, 
				message: "Updated red-flag record’s location"
		}]
	});
};

const updateComment = (req, res) => {
	//check if record with specific id exists
	const record = records.find(
		c => c.id === parseInt(req.params.id)
		);
	//if invalid return 404
	if (!record || (record.type !== "red-flag")) 
	res.status(404)
		.json({
			status: 404, 
			error: "Record not a red-flag Entry."
		});
	//else Update the record
	record.comment = req.body.comment || "Not provided";
	res.status(200).json({ 
		status: 200, 
		data: [
		 {	id: record.id, 
			message: "Updated red-flag record’s comment"
		}]
	});
}

const deleteIncident = (req, res) => {
	//check if record with specific id exists
	const record = records.find( 
		c => c.id === parseInt(req.params.id)
	);
	//if not return eror message
	if (!record || (record.type !== "red-flag")) 
	res.status(404)
		.json({
			status: 404, 
			error: "Record doesn't exist"});
	//else delete specific record
	const specificRecord = records.indexOf(record);
	records.splice(specificRecord, 1);
	//change status of deleted record and display record
	res.status(200)
		.json({ 
			status: 200, 
			data: [
			{ id: record.id, 
			  message: "red-flag record has been deleted"
		}]
	});
}

export default {
  getIncidents,
  getIncident,
  createIncident,
  updateLocation,
  updateComment,
  deleteIncident
};
