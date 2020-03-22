const express = require('express')
const nunjucks = require('nunjucks')

const port = 2020
const dirView = __dirname + '/data/view' // Path to view directory

const app = express()

let loaderFsNunjucks = new nunjucks.FileSystemLoader(dirView, {
    "watch": true,
    "noCache": true
})

let nunjucksEnv = new nunjucks.Environment(loaderFsNunjucks)
nunjucksEnv.express(app) // Hook up express and nunjucks

app.get('/', (req,res) => {
    
    res.render('home.html')
    
})

app.listen(port, () => console.log(`app is running on ${port}`))