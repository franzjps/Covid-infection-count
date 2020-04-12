const express = require('express')
const nunjucks = require('nunjucks')
const session = require('express-session')
const bodyParser = require('body-parser')
const axios = require('axios');

// internal module
const covidApi = require('./data/resource/covid-api');

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
    
    if (req.session.login) {
        return res.redirect('/secured')
    }


    res.render('home.html')
    
})

app.get('/carousel', (req,res) => {
    
    res.render('carousel.html')
    
})

app.get('/login', (req,res) => {
    
    res.render('login.html')
    
})

app.get('/news', (req,res) => {
    async function status(contentType = 'json', baseUrl = 'https://coronavirus-19-api.herokuapp.com/countries') {
        try {
            let accept = 'application/json'

            let response = await axios.get(`${baseUrl}`, {
                headers: {
                    'Accept': accept
                }
            });

            let responses = response.data;
                
            // console.log(responses)

            res.render('news.html', {responses: responses})

        } catch (err) {
            throw trimError(err)
        }
    }

    console.log(status())
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
    res.render('secured.html')
})


app.get('/logout', (req, res) => {
    req.session.login = false
    res.redirect('/')
})

app.listen(port, () => console.log(`app is running on ${port}`))