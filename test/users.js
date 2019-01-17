import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server";

const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe("USER ENDPOINTS", () => {
	let userDetails;
	const exec = () => {
		return chai
				.request(app)
				.post("/api/v1/auth/signup")
				.send(userDetails)
	};
	
	describe("POST /api/v1/auth/signup", () => {
		it("should create a new user in the database", (done) => {

			userDetails = {
				firstname: "John",
				lastname: "Ehdo",
				othernames: "Pauhl",
				phone_number: "08098983832",
				username: "jsevries",
				email: "jservies@gmail.com",
				password: "jseviejnjns",
				is_admin: "true"
			};
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

		it("should return 'duplicate' if username or email is not unique", (done) => {

			userDetails = {
                firstname: "Paul",
                lastname: "Peter",
                othernames: "Ose",
                phone_number: "08076879789",
                username: "jsevries",
                email: "paulpeter@gmail.com",
                password: "paulpeter",
                is_admin: "false"
            };
				exec()
				.end((err, res) => {
					expect(err).to.equal(null);
					expect(res.status).to.equal(400);
					expect(res.body).to.have.property("status");
					expect(res.body).to.have.property("error");
					expect(res.body.error).to.contain("duplicate");
					done();
				});
		});
	});

	describe("GET /api/v1/auth/users", () => {
		it("should fetch an array of all users in the database", (done) => {
			chai
				.request(app)
				.get("/api/v1/auth/users")
				.end((err, res) => {
					expect(err).to.equal(null);
					expect(res.status).to.equal(200);
					expect(res.body).to.have.property("status");
					expect(res.body).to.have.property("data");
					expect(res.body.data).to.be.an("array");
					done();
				});
		});

		// it("should return 404 error if users record is zero", (done) => {
		// 	chai
		// 		.request(app)
		// 		.get("/api/v1/auth/users")
		// 		.end((err, res) => {
		// 			expect(err).to.equal(null);
		// 			expect(res.status).to.equal(404);
		// 			expect(res.body).to.have.property("status");
		// 			expect(res.body).to.have.property("error");
		// 			expect(res.body.error).to.contain("No Users Found");
		// 			done();
		// 		});
		// 	});
		});

		describe("POST /api/v1/auth/login", () => {
			let userDetails;
			const exec = () => {
				return	chai
					.request(app)
					.post("/api/v1/auth/login")
					.send(userDetails)
				}

			it("should validate a user with valid user details", (done) => {				
				userDetails = { 
					email: "jservies@gmail.com",
					password: "jseviejnjns"
				}
					exec()
					.end((err, res) => {
						expect(err).to.equal(null);
						expect(res.status).to.equal(200);
						expect(res.body).to.have.property("status");
						expect(res.body).to.have.property("data");
						expect(res.body.data).to.be.an("array");
						done();
					});
			});

			it("should return 400 error if email is invalid or does not exist", (done) => {
				userDetails = {
					email: "",
					password: "invalid"
				}
					exec()
					.end((err, res) => {
						expect(err).to.equal(null);
						expect(res.status).to.equal(400);
						expect(res.body).to.have.property("status");
						expect(res.body).to.have.property("error");
						expect(res.body.error).to.contain("required");
						done();
					});
				});

				// it("should return 400 error if password is invalid or does not match", (done) => {
				// 	userDetails = {
				// 		email: "jservies@gmail.com",
				// 		password: "invalid"
				// 	}
				// 		exec()
				// 		.end((err, res) => {
				// 			expect(err).to.equal(null);
				// 			expect(res.status).to.equal(400);
				// 			expect(res.body).to.have.property("status");
				// 			expect(res.body).to.have.property("error");
				// 			expect(res.body.error).to.contain("Password is incorrect");
				// 			done();
				// 		});
				// 	});
			 });

			describe("DELETE /api/v1/auth/users", () => {
				it("should delete the user with the supplied email", (done) => {
	
					let email = "jservies@gmail.com";
					
					chai
						.request(app)
						.delete("/api/v1/auth/users")
						.send({email})
						.end((err, res) => {
							expect(res.status).to.equal(200);
							done();
						});
				});

				it("should return 404 error message if email does not exist", (done) => {
	
					let email = "";
					
					chai
						.request(app)
						.delete("/api/v1/auth/users")
						.send({email})
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
		
});