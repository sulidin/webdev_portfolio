const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000

//Interact with json file by using file system module
const fs = require('fs');
const { json } = require('express');

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/'));

//Index page
app.get('/', (req, res) => {
    let description = "I design and develop user interfaces,  seek to create asthetic, innovative and unique designs. Here you can find some of my web development projects.";
    var data = fs.readFileSync('data.json');
    var projects = JSON.parse(data);
    res.render('index', { description: description, projects: projects });
});

//About page
app.get('/about', (req, res) => {
    let behance = "https://www.behance.net/gallery/113868201/Portfolio";
    let linkedIn = "https://linkedin.com/in/furkan-bozokluoglu-46291440";
    let gitHub = "https://github.com/sulidin/webdev_portfolio.git";
    res.render('about', { linkedIn: linkedIn, gitHub: gitHub, behance: behance });
});

//Project page
app.get('/:id', function (req, res, next) {
    var rawData = fs.readFileSync('data.json');
    let projects = JSON.parse(rawData);
    res.render('project', { id: req.params.id, projects: projects[req.params.id] });
    next();
});

app.listen(port, () => {
    console.log('Application is running on localhost:3000')
});
