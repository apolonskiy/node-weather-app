const express = require('express');
const path = require('path');
const hbs = require('hbs');
const {geocode, geocodeReverse} = require('../utils/geocode');
const forecast = require('../utils/forecast');

const app = express();
const publicDirPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')
const port = process.env.PORT || 3003;

app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Andrii"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Andrii"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Page",
        name: "Andrii"
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }
    geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(longitude, latitude, (errorFc, data) => {
            if (errorFc) {
                return res.send({ error: errorFc });
            };
            res.send({
                forecast: data,
                location
            });

        })
    })
})

app.get('/weather/me', (req, res) => {
    if (!req.query.longitude) {
        return res.send({
            error: 'You must provide an address.'
        })
    }
    geocodeReverse(
        {
            longitude: req.query.longitude,
            latitude: req.query.latitude
        }, 
        (error, { longitude, latitude, location } = {}) => {

        if (error) {
            return res.send({ error });
        }
        forecast(longitude, latitude, (errorFc, data) => {
            if (errorFc) {
                return res.send({ error: errorFc });
            };
            res.send({
                forecast: data,
                location
            });

        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    console.log(req.query);
    res.send({
        "products": [],
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        name: 'Andrii',
        errorMessage: 'Arcitle not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        name: 'Andrii',
        errorMessage: 'Page not found!'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+ port);
});