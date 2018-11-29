var Request = require("request");
var server = require("..");

describe("Incident Endoints", () => {
	//let server;
	beforeAll(() => {
		server = require("..");
	});
	afterAll(() => {
		server.close();
	});
	describe("GET all", () => {
		var data = {};
		beforeAll((done) => {
			Request.get("http://localhost:3000/api/v2/red-flags", (error, response, body) => {
				data.status = response.statusCode;
				data.body = body;
				done();
			});
		});
		it("it should return Status 200", () => {
			expect(data.status).toBe(200);
		});
	});

	describe("GET api/v2/red-flags/1", () => {
		var data = {};
		beforeAll((done) => {
			Request.get("http://localhost:3000/api/v2/red-flags/1", (error, response, body) => {
				data.status = response.statusCode;
				data.body = body;
				done();
			});
		});
		it("it should return Status 200", () => {
			expect(data.status).toBe(200);
		});
		beforeAll((done) => {
			var data = {};
			Request.get("http://localhost:3000/api/v2/red-flags/10", (error, response, body) => {
				data.status = response.statusCode;
				data.body = body;
				done();
			});
		});
		it("it should throw for invalid id", () => {
			expect(data.status).toBe(404);
		});

	});




});