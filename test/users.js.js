import chai from "chai";
import chaiHttp from "chai-http";
import server from "..";

const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);


// Users test

describe("Users Endpoints", () => {
	
	describe("GET /api/v1/users", () => {
		it("should return a list of all users", (done) => {
			chai
				.request(server)
				.get("/api/v1/users")
				.end((err, res) => {
					expect(res.status).to.equal(200);
					res.body.should.have.property("status");
					res.body.should.have.property("data");
					done();
				});
		});
	});
});