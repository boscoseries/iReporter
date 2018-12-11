import chai from "chai";
import chaiHttp from "chai-http";
import server from "../server/index";

const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe("API", () => {
	
	describe("GET /api/v1", () => {
		it("should return Welcome to iReporter API", (done) => {
			chai
				.request(server)
				.get("/api/v1")
				.end((err, res) => {
					expect(res.status).to.equal(200);
					expect(res.body).to.equal("Welcome to iReporter API");
					done();
				});
		});
    });


    describe("GET /", () => {
		it("should return Welcome to iReporter", (done) => {
			chai
				.request(server)
				.get("/")
				.end((err, res) => {
					expect(res.status).to.equal(200);
					expect(res.body).to.equal("Welcome to iReporter");
					done();
				});
		});
    });
});