let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require("../index")

chai.should()
chai.use(chaiHttp)

describe('Courses API', () => {

    // Test for GET method
    describe("GET /api/courses", () => {
        it("it should get all the courses", (done) => {
            chai.request(server)
                .get("/api/courses")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eq(10);
                done();
                });
        });

        it("it should not get all the courses", (done) => {
            chai.request(server)
                .get("/api/course")
                .end((err, res) => {
                    res.should.have.status(404);
                done();
                });
        });  
    });

    describe("GET /api/courses/:id", () => {
        it("it should get a course by id", (done) => {
            const courseId = 'CS1010';
            chai.request(server)
                .get("/api/courses/" + courseId)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id');
                    res.body.should.have.property('name');
                    res.body.should.have.property('id').eq('CS1010');
                    res.body.should.have.property('name').eq('Programming Methodology I');
                done();
                });
        });

        it("it should not get a course by id", (done) => {
            const courseId = 'CS1011';
            chai.request(server)
                .get("/api/courses/" + courseId)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.text.should.be.eq('The course with the given ID was not found');
                done();
                });
        });
    });

    // Test for POSR method
    describe("POST /api/courses", () => {
        it("it should post a course", (done) => {
            const course = {
                id: 'CS4212',
                name: 'Formal Method for Software Engineering'
            };
            chai.request(server)
                .post("/api/courses")
                .send(course)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id');
                    res.body.should.have.property('name');
                    res.body.should.have.property('id').eq('CS4212');
                    res.body.should.have.property('name').eq('Formal Method for Software Engineering');
                done();
                });
        });

        it("it should not post a course", (done) => {
            const course = {
                id: 'CS1010',
                name: 'New Course'
            };
            chai.request(server)
                .post("/api/courses/")
                .send(course)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.text.should.be.eq('The course with the given ID already exists');
                done();
                });
        });
    });

    // Test for PUT method
    describe("PUT /api/courses/:id", () => {
        it("it should put a course", (done) => {
            const courseId = 'CS1010';
            const course = {
                name: 'Editted Course'
            };
            chai.request(server)
                .put("/api/courses/" + courseId)
                .send(course)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id');
                    res.body.should.have.property('name');
                    res.body.should.have.property('id').eq('CS1010');
                    res.body.should.have.property('name').eq('Editted Course');
                done();
                });
        });

        it("it should not put a course", (done) => {
            const courseId = 'CS1011';
            const course = {
                name: 'Editted Course'
            };
            chai.request(server)
                .put("/api/courses/" + courseId)
                .send(course)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.text.should.be.eq('The course with the given ID was not found');
                done();
                });
        });
    });

    // Test for DELETE method
    describe("DELETE /api/courses/:id", () => {
        it("it should delete a course", (done) => {
            const courseId = 'CS1010';
            chai.request(server)
                .delete("/api/courses/" + courseId)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id');
                    res.body.should.have.property('name');
                    res.body.should.have.property('id').eq('CS1010');
                    res.body.should.have.property('name').eq('Editted Course');
                done();
                });
        });

        it("it should not delete a course", (done) => {
            const courseId = 'CS1011';
            chai.request(server)
                .delete("/api/courses/" + courseId)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.text.should.be.eq('The course with the given ID was not found');
                done();
                });
        });
    });
});
