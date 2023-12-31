const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const publicdirectorypath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialpath = path.join(__dirname, '../templates/partials')

app.set('views', viewspath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialpath)

app.use(express.static(publicdirectorypath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'DK'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'DK'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helptext: 'This is some helpful text.',
        title: 'Help',
        name: 'DK'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
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

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.listen(3000, () => {
    console.log('Sever is up on port 3000.')
})

