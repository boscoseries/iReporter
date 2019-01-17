import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server";

const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe("INTERVENTION ENDPOINTS", () => {

	describe("POST /api/v1/auth/signup", () => {
		it("should create a user with Id = 1", (done) => {

			let userDetails = {
				firstname: "user1",
				lastname: "goodtime",
				othernames: "richy",
				phone_number: "07098983832",
				username: "user1",
				email: "goodtime@gmail.com",
				password: "goodtime",
				is_admin: "false"
			};
			chai
				.request(app)
				.post("/api/v1/auth/signup")
				.send(userDetails)
				.end((err, res) => {
					expect(res.status).to.equal(201);
					done();
				});
		});
	});
	
	describe("POST /api/v1/interventions", () => {
		it("should create a new intervention record for the user created above", (done) => {

			const recordDetails = {	
				created_by: "1",
				type: "intervention",
				location: "Lagos",
				images: "image.jpg",
				videos: "video.jpeg",
				email: "ppeter@gmail.com",
				comment: ".........jsevi........."
			}
			
			chai
				.request(app)
				.post("/api/v1/interventions")
				.send(recordDetails)
				.end((err, res) => {
					expect(err).to.equal(null);
					expect(res.status).to.equal(201);
					expect(res.body).to.have.property("status");
					expect(res.body).to.have.property("data");
					expect(res.body.data).to.be.an("array");
					done();
				});
		});

		it("should should throw if 'created_by' is not a registered userId", (done) => {

			const recordDetails = {	
				created_by: "20",
				type: "intervention",
				location: "Lagos",
				images: "image.jpg",
				videos: "video.jpeg",
				email: "ppeter@gmail.com",
				comment: ".........jsevi........."
			}
			
			chai
				.request(app)
				.post("/api/v1/interventions")
				.send(recordDetails)
				.end((err, res) => {
					expect(err).to.equal(null);
					expect(res.status).to.equal(400);
					expect(res.body).to.have.property("status");
					expect(res.body).to.have.property("error");
					done();
				});
		});
	});

		describe("GET /api/v1/interventions", () => {
			it("should return an array of all intervention records available", (done) => {
			
				chai
					.request(app)
					.get("/api/v1/interventions")
					.end((err, res) => {
						expect(err).to.equal(null);
						expect(res.status).to.equal(200);
						expect(res.body).to.have.property("status");
						expect(res.body).to.have.property("data");
						expect(res.body.data).to.be.an("array");
						done();
					});
				});
			});
	
			//it("should return 404 error if intervention record is zero", (done) => {

			// 	chai
			// 		.request(app)
			// 		.get("/api/v1/interventions")
			// 		.end((err, res) => {
			// 			expect(err).to.equal(null);
			// 			expect(res.status).to.equal(400);
			// 			expect(res.status).to.equal(404);
			// 			expect(res.body).to.have.property("status");
			// 			expect(res.body).to.have.property("error");
			// 			expect(res.body.error).to.contain("No record Found");
			// 			done();
			// 		});
			// });

			describe("GET /api/v1/interventions/:id", () => {
				it("should return the intervention record for the id=1", (done) => {
				
					chai
						.request(app)
						.get("/api/v1/interventions/1")
						.end((err, res) => {
							expect(err).to.equal(null);
							expect(res.status).to.equal(200);
							expect(res.body).to.have.property("status");
							expect(res.body).to.have.property("data");
							expect(res.body.data).to.be.an("object");
							done();
						});
					});
		
				it("should return 404 error if record with id does not exist", (done) => {
	
					chai
						.request(app)
						.get("/api/v1/interventions/5")
						.end((err, res) => {
							expect(err).to.equal(null);
							expect(res.status).to.equal(404);
							expect(res.status).to.equal(404);
							expect(res.body).to.have.property("status");
							expect(res.body).to.have.property("error");
							expect(res.body.error).to.contain("No record available");
							done();
						});
				});
		});

		describe("PATCH /api/v1/interventions/:id/location", () => {
			it("should update the location of the intervention record with id=1", (done) => {

				chai
					.request(app)
					.patch("/api/v1/interventions/1/location")
					.send({location: "Abuja"})
					.end((err, res) => {
						expect(err).to.equal(null);
						expect(res.status).to.equal(200);
						expect(res.body).to.have.property("status");
						expect(res.body).to.have.property("data");
						expect(res.body.data).to.be.an("array");
						done();
					});
			});
	
			it("should should throw if 'created_by' is not a registered userId", (done) => {
	
				chai
						.request(app)
						.patch("/api/v1/interventions/5/location")
						.send({location: "Owerri"})
						.end((err, res) => {
							expect(err).to.equal(null);
							expect(res.status).to.equal(404);
							expect(res.status).to.equal(404);
							expect(res.body).to.have.property("status");
							expect(res.body).to.have.property("error");
							expect(res.body.error).to.contain("undefined");
							done();
						});
				});
		});

		describe("PATCH /api/v1/interventions/:id/comment", () => {
			it("should update the comment of the intervention record with id=1", (done) => {

				chai
					.request(app)
					.patch("/api/v1/interventions/1/comment")
					.send({comment: "available"})
					.end((err, res) => {
						expect(err).to.equal(null);
						expect(res.status).to.equal(200);
						expect(res.body).to.have.property("status");
						expect(res.body).to.have.property("data");
						expect(res.body.data).to.be.an("array");
						done();
					});
			});
	
			it("should should throw if id is not a registered userId", (done) => {
	
				chai
						.request(app)
						.patch("/api/v1/interventions/5/comment")
						.send({comment: "new comment"})
						.end((err, res) => {
							expect(err).to.equal(null);
							expect(res.status).to.equal(404);
							expect(res.status).to.equal(404);
							expect(res.body).to.have.property("status");
							expect(res.body).to.have.property("error");
							expect(res.body.error).to.contain("undefined");
							done();
						});
				});
		});

		describe("PATCH /api/v1/interventions/:id/status", () => {
			it("should update the comment of the intervention record with id=1", (done) => {

				chai
					.request(app)
					.patch("/api/v1/interventions/1/status")
					.send({status: "under investigation"})
					.end((err, res) => {
						expect(err).to.equal(null);
						expect(res.status).to.equal(200);
						expect(res.body).to.have.property("status");
						expect(res.body).to.have.property("data");
						expect(res.body.data).to.be.an("array");
						done();
					});
			});
	
			it("should should throw if id is not a registered userId", (done) => {
	
				chai
						.request(app)
						.patch("/api/v1/interventions/5/status")
						.send({status: "resolved"})
						.end((err, res) => {
							expect(err).to.equal(null);
							expect(res.status).to.equal(404);
							expect(res.status).to.equal(404);
							expect(res.body).to.have.property("status");
							expect(res.body).to.have.property("error");
							expect(res.body.error).to.contain("undefined");
							done();
						});
				});
		});

		describe("DELETE /api/v1/interventions/:id", () => {
			it("should delete the intervention record with id=1", (done) => {

				chai
					.request(app)
					.delete("/api/v1/interventions/1")
					.end((err, res) => {
						expect(err).to.equal(null);
						expect(res.status).to.equal(200);
						expect(res.body).to.have.property("status");
						expect(res.body).to.have.property("data");
						expect(res.body.data).to.be.an("array");
						done();
					});
			});
	
			it("should should throw if id is not a registered userId", (done) => {
	
				chai
						.request(app)
						.delete("/api/v1/interventions/5")
						.end((err, res) => {
							expect(err).to.equal(null);
							expect(res.status).to.equal(404);
							expect(res.status).to.equal(404);
							expect(res.body).to.have.property("status");
							expect(res.body).to.have.property("error");
							expect(res.body.error).to.contain("undefined");
							done();
						});
				});
		});
	});