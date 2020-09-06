// Initialize express router
let router = require('express').Router();

let courses = [
    {id: 'CS1010', name: 'Programming Methodology I'},
    {id: 'CS2030', name: 'Programming Methodology II'},
    {id: 'CS2040', name: 'Data Structure and Algorithms'},
    {id: 'CS2102', name: 'Database Systems'},
    {id: 'CS2030', name: 'Software Engineering'},
    {id: 'CS2105', name: 'Introduction to Networking'},
    {id: 'CS2106', name: 'Introduction to Operating Systems'},
    {id: 'CS2107', name: 'Introduction to Information Security'},
    {id: 'CS3219', name: 'Software Engineering Principles and Patterns'},
    {id: 'CS3230', name: 'Design and Analysis of Algorithms'},
]

// Set default API response
router.get('/', (req, res) => {
    res.send("Welcome to Courses API");
});

// Set get all courses API response
router.get('/courses', (req, res) => {
    res.send(courses);
});

// Set get one course API response
router.get('/courses/:id', (req, res) => {
    let course = courses.find(course => course.id.localeCompare(req.params.id) == 0); 
    if (!course) return res.status(404).send('The course with the given ID was not found');
    res.send(course);
});

// Set post course API response
router.post('/courses', (req, res) => {
    if (!req.body.id || !req.body.name) return res.status(400).send('Both id and name of the course are required');
    let course = courses.find(course => course.id.localeCompare(req.body.id) == 0); 
    if (course) return res.status(400).send('The course with the given ID already exists');
    let new_course = {
        id: req.body.id,
        name: req.body.name
    };
    courses.push(new_course);
    res.send(new_course);
});

// Set put course API response
router.put('/courses/:id', (req, res) => {
    let course = courses.find(course => course.id.localeCompare(req.params.id) == 0);
    if (!course) return res.status(404).send('The course with the given ID was not found');
    if (!req.body.name) return res.status(400).send('Name of the course is required');
    course.name = req.body.name;
    res.send(course);
});

// Set delete course API response
router.delete('/courses/:id', (req, res) => {
    let course = courses.find(course => course.id.localeCompare(req.params.id) == 0);
    if (!course) return res.status(404).send('The course with the given ID was not found');
    let index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course) ;
});

// Export API routes
module.exports = router;