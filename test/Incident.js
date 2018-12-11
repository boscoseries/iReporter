import chai from "chai";
import chaiHttp from "chai-http";
import server from "../server";

const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe("Incident Endpoints", () => {
	
	describe("POST /api/v1/red-flags", () => {
		it("should create a red-flag record", (done) => {
			const values = {
				"created_by": "2",
				"type": "red-flag",
				"location": "Lagos",
				"images": "image1.jpg",
				"videos": "video1.jpg",
				"comment": "I just created me on database"
			};
			chai
				.request(server)
				.post("/api/v1/red-flags")
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

	});