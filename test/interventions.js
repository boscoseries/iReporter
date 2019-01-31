import chai from "chai";
import chaiHttp from "chai-http";
import app from "../dist";
import helper from '../dist/middlewares/helpers'

const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

const admin = {
	username: "user1",
	admin: true
}
let adminToken = helper.generateToken(admin);

const user = {
	username: "user2",
	admin: false
}
let userToken = helper.generateToken(user);

const noToken = '';

const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5OWNmODk5YS03YjlkLTQ3MTYtOTBmMi0wNDdhOT';

const invalidRoute = "/api/v1/intervghvhfs"

describe("INTERVENTION ENDPOINTS", () => {

	describe("POST /api/v1/auth/signup", () => {
		it("should create a new user without access token supplied", (done) => {

			let userDetails = {
				firstname: "user1",
				lastname: "goodtime",
				othernames: "richy",
				phone_number: "07098983832",
				username: "user1",
				email: "goodtime@gmail.com",
				password: "goodtime",
				is_admin: "true"
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
				.set('x-access-token', userToken)
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
				.set('x-access-token', userToken)
				.send(recordDetails)
				.end((err, res) => {
					expect(err).to.equal(null);
					expect(res.status).to.equal(500);
					expect(res.body).to.have.property("status");
					expect(res.body).to.have.property("error");
					done();
				});
		});
	});

		describe("GET /api/v1/interventions", () => {

			it("should throw 400 error if invalid path is entered", (done) => {
				chai
					.request(app)
					.get(invalidRoute)
					.set('x-access-token', adminToken)
					.end((err, res) => {
						expect(err).to.equal(null);
						expect(res.status).to.equal(400);
						expect(res.body).to.have.property("status");
						expect(res.body).to.have.property("error");
						expect(res.body.error).to.contain("Invalid path supplied");
						done();
					});
				});

			it("should throw 401 error if access token is invalid", (done) => {
				chai
					.request(app)
					.get("/api/v1/interventions")
					.set('x-access-token', invalidToken)
					.end((err, res) => {
						expect(err).to.equal(null);
						expect(res.status).to.equal(401);
						expect(res.body).to.have.property("status");
						expect(res.body).to.have.property("error");
						expect(res.body.error).to.contain("Authentication failed");
						done();
					});
				});


			it("should throw 401 error if user is not an Admin", (done) => {
				chai
					.request(app)
					.get("/api/v1/interventions")
					.set('x-access-token', userToken)
					.end((err, res) => {
						expect(err).to.equal(null);
						expect(res.status).to.equal(401);
						expect(res.body).to.have.property("status");
						expect(res.body).to.have.property("error");
						expect(res.body.error).to.contain("You are not allowed to assess this route");
						done();
					});
				});

			it("should return an array of all intervention records available", (done) => {
				chai
					.request(app)
					.get("/api/v1/interventions")
					.set('x-access-token', adminToken)
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
	
			describe("GET /api/v1/interventions/:id", () => {

				it("should throw 401 error if access token is not provided", (done) => {
					chai
						.request(app)
						.get("/api/v1/interventions/1")
						.set('x-access-token', noToken)
						.end((err, res) => {
							expect(err).to.equal(null);
							expect(res.status).to.equal(401);
							expect(res.body).to.have.property("status");
							expect(res.body).to.have.property("error");
							expect(res.body.error).to.contain("Access Token is required");
							done();
						});
					});
					
				it("should return the intervention record for the id=1", (done) => {
					chai
						.request(app)
						.get("/api/v1/interventions/1")
						.set('x-access-token', userToken)
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
						.set('x-access-token', userToken)
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
					.set('x-access-token', userToken)
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
						.set('x-access-token', userToken)
						.send({location: "Owerri"})
						.end((err, res) => {
							expect(err).to.equal(null);
							expect(res.status).to.equal(500);
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
					.set('x-access-token', userToken)
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
						.set('x-access-token', userToken)
						.send({comment: "new comment"})
						.end((err, res) => {
							expect(err).to.equal(null);
							expect(res.status).to.equal(500);
							expect(res.body).to.have.property("status");
							expect(res.body).to.have.property("error");
							expect(res.body.error).to.contain("undefined");
							done();
						});
				});
		});

		describe("PATCH /api/v1/interventions/:id/status", () => {

			it("should throw 401 error if user is not an Admin", (done) => {
				chai
					.request(app)
					.patch("/api/v1/interventions/1/status")
					.set('x-access-token', userToken)
					.send({status: "under investigation"})
					.end((err, res) => {
						expect(err).to.equal(null);
						expect(res.status).to.equal(401);
						expect(res.body).to.have.property("status");
						expect(res.body).to.have.property("error");
						expect(res.body.error).to.contain("not allowed to assess");
						done();
					})
			})

			it("should update the status of the intervention record with id=1", (done) => {
				chai
					.request(app)
					.patch("/api/v1/interventions/1/status")
					.set('x-access-token', adminToken)
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
						.set('x-access-token', adminToken)
						.send({status: "resolved"})
						.end((err, res) => {
							expect(err).to.equal(null);
							expect(res.status).to.equal(500);
							expect(res.body).to.have.property("status");
							expect(res.body).to.have.property("error");
							//expect(res.body.error).to.contain("undefined");
							done();
						});
				});
		});

		describe("DELETE /api/v1/interventions/:id", () => {
			it("should should throw if id is not a registered userId", (done) => {
					
				chai
						.request(app)
						.delete("/api/v1/interventions/5")
						.set('x-access-token', userToken)
						.end((err, res) => {
							expect(err).to.equal(null);
							expect(res.status).to.equal(500);
							expect(res.body).to.have.property("status");
							expect(res.body).to.have.property("error");
							expect(res.body.error).to.contain("undefined");
							done();
						});
				});

			it("should delete the intervention record with id=1", (done) => {

				chai
					.request(app)
					.delete("/api/v1/interventions/1")
					.set('x-access-token', userToken)
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
	});