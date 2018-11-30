var Request = require("request");
var server = require("../index");

describe("Incident Endoints", () => {
	//let server;
	beforeAll(() => {
		server = require("../index");
	});
	afterAll(() => {
		server.close();
	});
	describe("GET /red-flags", () => {
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

	describe("GET /red-flags/1", () => {
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
	});

	describe("POST /red-flags/", () => {
		var data = {};
		beforeAll((done) => {
			Request.post("http://localhost:3000/api/v2/red-flags", (error, response, body) => {
				data.status = response.statusCode;
				data.body = body;
				done();
			});
		});

		it("it should return Status 200", () => {
			expect(data.status).toBe(200);
		});
	});

	describe("PUT /red-flags/:id/location", () => {
		var data = {};
		beforeAll((done) => {
			Request.put("http://localhost:3000/api/v2/red-flags/1/location", (error, response, body) => {
				data.status = response.statusCode;
				data.body = body;
				done();
			});
		});

		it("it should return Status 200", () => {
			expect(data.status).toBe(200);
		});
	});

	describe("PUT /red-flags/:id/comment", () => {
		var data = {};
		beforeAll((done) => {
			Request.put("http://localhost:3000/api/v2/red-flags/10/comment", (error, response, body) => {
				data.status = response.statusCode;
				data.body = body;
				done();
			});
		});

		it("it should return error for non-users(id: 10)", () => {
			expect(data.status).toBe(404);
		});
	});



});