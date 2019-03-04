const path = require('path')
const express = require('express')
const hbs = require('hbs')
//express is function
const app = express()

const forecast =  require('./utils/forecast')
const geocode = require('./utils/geocode')

//define config for expres config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsDirectoryPath = path.join(__dirname, '../templates/views')
const partialDirectorytPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine 
app.set('view engine','hbs')
app.set('views',viewsDirectoryPath)
hbs.registerPartials(partialDirectorytPath)

//use to serve html page
app.use(express.static(publicDirectoryPath))

//routes
app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather App',
        name:'Shiva'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About me',
        name:'Shiva'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help',
        helpText:'Contact for help',
        name:'shiva'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title:'404 page',
        errmsg:'help article not found',
        name:'shiva'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title:'404 page',
        errmsg:'My 404 page',
        name:'Shiva'
    })
})

app.listen(3000,() => {
    console.log('server started on port 3000')
}) 