const express = require('express')
const nunjucks = require('nunjucks')
const session = require('express-session')
const bodyParser = require('body-parser')

const port = 2020
const dirView = __dirname + '/data/public/view' // Path to view directory

const app = express()

// Parse http body
app.use(bodyParser.json()) // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
        extended: true
}))

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))

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

app.get('/login', (req,res) => {
    
    res.render('login.html')
    
})

app.post('/login', (req,res) => {
    
    let post = req.body
    
    if (post.email === 'g@gmail.com' && post.password === '123') {
        req.session.login = true
        return res.redirect('/secured')
    } else {
        res.send('Invalid email or password.')
    }
    
})

app.get('/secured', (req, res) => {
    if (!req.session.login) {
            return res.redirect('/login')
    }
    res.render('home.html')
})

app.listen(port, () => console.log(`app is running on ${port}`))