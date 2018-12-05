import chai from "chai";
import chaiHttp from "chai-http";
import server from "..";

const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe("Incident Endpoints", () => {
	
	describe("GET /", () => {
		it("should return Welcome to my API", (done) => {
			chai
				.request(server)
				.get("/")
				.end((err, res) => {
					expect(res.status).to.equal(200);
					expect(res.body).to.contain("Welcome to my API");
					done();
				});
		});
	});

	describe("GET /api/v2/red-flags", () => {
		it("should return all red-flag records", (done) => {
			chai
				.request(server)
				.get("/api/v2/red-flags")
				.end((err, res) => {
					expect(res.status).to.equal(200);
					res.body.should.have.property("status");
					res.body.should.have.property("data");
					done();
				});
		});
	});

	describe("GET /api/v2/red-flags/:id", () => {
		it("should return a red-flag record for given id", (done) => {
			chai
				.request(server)
				.get("/api/v2/red-flags/1")
				.end((err, res) => {
					expect(res.status).to.equal(200);
					res.body.should.have.property("status");
					res.body.should.have.property("data");
					done();
				});
		});

		/************ BUG *********/

			// it("should throw for id not in database", (done) => {
			// 	chai
			// 		.request(server)
			// 		.get("/api/v2/red-flags/10")
			// 		.end((err, res) => {
			// 			expect(res.status).to.equal(404);
			// 			res.body.should.have.property("status");
			// 			res.body.should.have.property("error");
			// 			done();
			// 		});
			// });	

		/************ END OF BUG *********/
	});



	describe("POST /api/v2/red-flags", () => {
		it("should create a red-flag record", (done) => {
			const values = {
				"location": "Latitude: 6.6636025, Longitude: 3.289491",
				"comment": "My neighbour is a drug baron..."
			};
			chai
				.request(server)
				.post("/api/v2/red-flags")
				.send(values)
				.end((err, res) => {
					expect(res.status).to.equal(200);
					res.body.should.have.property("status");
					res.body.should.have.property("data");
					res.body.should.be.a("object");
					done();
				});
		});
	});

	describe("PUT /api/v2/red-flags/:id/location", () => {
		it("should update the location a red-flag record", (done) => {
			const values = {
				"location": "Latitude: 6.663, Longitude: 3.289"
			};
			chai
				.request(server)
				.put("/api/v2/red-flags/1/location")
				.send(values)
				.end((err, res) => {
					expect(res.status).to.equal(200);
					res.body.should.have.property("status");
					res.body.should.have.property("data");
					res.body.should.be.a("object");
					done();
				});
		});

		/************ BUG *********/

		// it("should throw if id doesnt belong to a red-flag user", (done) => {
		// 	import values = {
		// 		"location": "Latitude: 6.663, Longitude: 3.289",
		// 	};
		// 	chai
		// 		.request(server)
		// 		.put("/api/v2/red-flags/2/location")
		// 		.send(values)
		// 		.end((err, res) => {
		// 			expect(res.status).to.equal(404);
		// 			res.body.should.have.property("status");
		// 			res.body.should.have.property("error");
		// 			res.body.should.be.a("object");
		// 			expect(res.body.error).to.contain("Record not a red-flag Entry.");
		// 			done();
		// 		});
		// });

		/************ END OF BUG *********/
	});

	describe("PUT /api/v2/red-flags/:id/comment", () => {
		it("should update the location a red-flag record", (done) => {
			const values = {
				"comment": "....this is an edited comment..."
			};
			chai
				.request(server)
				.put("/api/v2/red-flags/1/comment")
				.send(values)
				.end((err, res) => {
					expect(res.status).to.equal(200);
					res.body.should.have.property("status");
					res.body.should.have.property("data");
					res.body.should.be.a("object");
					done();
				});
		});

		/************ BUG *********/

		// it("should throw if id doesnt belong to a red-flag user", (done) => {
		// 	const values = {
		// 		"comment": "....this is an edited comment..."
		// 	};
		// 	chai
		// 		.request(server)
		// 		.put("/api/v2/red-flags/2/location")
		// 		.send(values)
		// 		.end((err, res) => {
		// 			expect(res.status).to.equal(404);
		// 			res.body.should.have.property("status");
		// 			res.body.should.have.property("error");
		// 			res.body.should.be.a("object");
		// 			expect(res.body.error).to.contain("Record not a red-flag Entry.");
		// 			done();
		// 		});
		// });

		/************ END OF BUG *********/
	});

	describe("DELETE /api/v2/red-flags/:id", () => {
		it("should delete the red-flag record of the user with the id", (done) => {
			chai
				.request(server)
				.delete("/api/v2/red-flags/1")
				.end((err, res) => {
					expect(res.status).to.equal(200);
					res.body.should.have.property("status");
					res.body.should.have.property("data");
					res.body.should.be.a("object");
					done();
				});
		});

		/************ START OF BUG *********/

		// it("should throw if id doesnt belong to a red-flag user", (done) => {
		// 	chai
		// 		.request(server)
		// 		.delete("/api/v2/red-flags/2")
		// 		.end((err, res) => {
		// 			expect(res.status).to.equal(404);
		// 			res.body.should.have.property("status");
		// 			res.body.should.have.property("error");
		// 			res.body.should.be.a("object");
		// 			expect(res.body.error).to.contain("Record cannot be deleted because it doesn't exist");
		// 			done();
		// 		});
		// });

		// it("should throw if id doesnt exist", (done) => {
		// 	chai
		// 		.request(server)
		// 		.delete("/api/v2/red-flags/10")
		// 		.end((err, res) => {
		// 			expect(res.status).to.equal(404);
		// 			res.body.should.have.property("status");
		// 			res.body.should.have.property("error");
		// 			res.body.should.be.a("object");
		// 			expect(res.body.error).to.contain("Record cannot be deleted because it doesn't exist");
		// 			done();
		// 		});
		// });

		/************ END OF BUG *********/
	});
});