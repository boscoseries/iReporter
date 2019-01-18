import chai from "chai";
import chaiHttp from "chai-http";
import helper from '../server/middlewares/helpers'
import app from "../server";

const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);


const admin = {
				username: "admin",
				admin: true
}
let adminToken = helper.generateToken(admin);

const user = {
	username: "user2",
	admin: false
}
let userToken = helper.generateToken(user);

const invalidToken = '';

describe("REDFLAG ENDPOINTS", () => {

	describe("POST /api/v1/auth/signup", () => {
		it("should create a user with id=2", (done) => {

			let userDetails = {
				firstname: "user2",
				lastname: "michael",
				othernames: "michael",
				phone_number: "07067983832",
				username: "user2",
				email: "michael@gmail.com",
				password: "michaele",
				is_admin: "false"
			};
			chai
				.request(app)
				.post("/api/v1/auth/signup")
				.set('x-access-token', adminToken)
				.send(userDetails)
				.end((err, res) => {
					expect(res.status).to.equal(201);
					done();
				});
		});
	});
	
	describe("POST /api/v1/red-flags", () => {
		const recordDetails = {	
			created_by: "2",
			type: "red-flag",
			location: "Imo",
			images: "image.jpg",
			videos: "video.jpeg",
			comment: ".........jsevi........."
		}

		const exec = () => {
			return chai
				.request(app)
				.post("/api/v1/red-flags")
				.set('x-access-token', adminToken)
				.send(recordDetails)
		};

		

		it("should create a new red-flag record for user 2", (done) => {
			
				exec()
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
				created_by: "7",
				type: "red-flag",
				location: "Imo",
				images: "image.jpg",
				videos: "video.jpeg",
				comment: ".........jsevi........."
			}

				chai
					.request(app)
					.post("/api/v1/red-flags")
					.set('x-access-token', adminToken)
					.send(recordDetails)
					.end((err, res) => {
					expect(err).to.equal(null);
					expect(res.status).to.equal(400);
					expect(res.body).to.have.property("status");
					done();
				});
		});
	});

		describe("GET /api/v1/red-flags", () => {

			it("should throw 401 error if access token is invalid", (done) => {
				chai
					.request(app)
					.get("/api/v1/red-flags")
					.set('x-access-token', invalidToken)
					.end((err, res) => {
						expect(err).to.equal(null);
						expect(res.status).to.equal(401);
						expect(res.body).to.have.property("status");
						expect(res.body).to.have.property("error");
						expect(res.body.error).to.contain("Access Token is required");
						done();
					});
				});

			it("should throw 401 error if user is not an Admin", (done) => {
				chai
					.request(app)
					.get("/api/v1/red-flags")
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

			it("should return an array of all red-flag records available", (done) => {
				chai
					.request(app)
					.get("/api/v1/red-flags")
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

			describe("GET /api/v1/red-flags/:id", () => {

				it("should throw 401 error if access token is invalid", (done) => {
					chai
						.request(app)
						.get("/api/v1/red-flags/3")
						.set('x-access-token', invalidToken)
						.end((err, res) => {
							expect(err).to.equal(null);
							expect(res.status).to.equal(401);
							expect(res.body).to.have.property("status");
							expect(res.body).to.have.property("error");
							expect(res.body.error).to.contain("Access Token is required");
							done();
						});
					});

				it("should return the red-flag record for the id=3", (done) => {
					chai
						.request(app)
						.get("/api/v1/red-flags/3")
						.set('x-access-token', adminToken)
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
						.get("/api/v1/red-flags/5")
						.set('x-access-token', adminToken)
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

		describe("PATCH /api/v1/red-flags/:id/location", () => {
			it("should update the location of the red-flag record with id=3", (done) => {

				chai
					.request(app)
					.patch("/api/v1/red-flags/3/location")
					.set('x-access-token', adminToken)
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
	
			it("should should throw if id is not a registered userId", (done) => {
	
				chai
						.request(app)
						.patch("/api/v1/red-flags/5/location")
						.set('x-access-token', adminToken)
						.send({location: "Owerri"})
						.end((err, res) => {
							expect(err).to.equal(null);
							expect(res.status).to.equal(404);
							expect(res.status).to.equal(404);
							expect(res.body).to.have.property("status");
							expect(res.body).to.have.property("error");
							//expect(res.body.error).to.contain("undefined");
							done();
						});
				});
		});

		describe("PATCH /api/v1/red-flags/:id/comment", () => {
			it("should update the comment of the red-flag record with id=3", (done) => {

				chai
					.request(app)
					.patch("/api/v1/red-flags/3/comment")
					.set('x-access-token', adminToken)
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
						.patch("/api/v1/red-flags/5/comment")
						.set('x-access-token', adminToken)
						.send({comment: "new comment"})
						.end((err, res) => {
							expect(err).to.equal(null);
							expect(res.status).to.equal(404);
							expect(res.body).to.have.property("status");
							expect(res.body).to.have.property("error");
							expect(res.body.error).to.contain("undefined");
							done();
						});
				});
		});

		describe("PATCH /api/v1/red-flags/:id/status", () => {

			it("should throw 401 error if user is not an Admin", (done) => {
				chai
					.request(app)
					.patch("/api/v1/red-flags/1/status")
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

			it("should update the comment of the red-flag record with id=3", (done) => {
				chai
					.request(app)
					.patch("/api/v1/red-flags/3/status")
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
						.patch("/api/v1/red-flags/5/status")
						.set('x-access-token', adminToken)
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

		describe("DELETE /api/v1/red-flags/:id", () => {
			it("should delete the red-flag record with id=3", (done) => {

				chai
					.request(app)
					.delete("/api/v1/red-flags/3")
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
	
			it("should should throw if id is not a registered userId", (done) => {
	
				chai
						.request(app)
						.delete("/api/v1/red-flags/5")
						.set('x-access-token', adminToken)
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