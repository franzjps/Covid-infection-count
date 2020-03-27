const express = require('express')
const nunjucks = require('nunjucks')

const port = 2020
const dirView = __dirname + '/data/public/view' // Path to view directory

const app = express()

app.use(express.static(__dirname + '/data/public'));

let loaderFsNunjucks = new nunjucks.FileSystemLoader(dirView, {
    "watch": true,
    "noCache": true
})

let nunjucksEnv = new nunjucks.Environment(loaderFsNunjucks)
nunjucksEnv.express(app) // Hook up express and nunjucks

app.get('/', (req,res) => {
    
    res.render('home.html')
    
})

app.get('/carousel', (req,res) => {
    
    res.render('carousel.html')
    
})

app.listen(port, () => console.log(`app is running on ${port}`))