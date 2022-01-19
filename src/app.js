const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname, '../public'))

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Vítor Santos'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help',
        message: 'This page aims to help you.',
        name: 'Vítor Santos'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About',
        name: 'Vítor Santos'
    })
})

app.get('/weather',(req, res) =>{

    let address = req.query.address

    if(!address){
        return res.send({
            error:'You must provide an address!'
        })
    }

    geocode(address, (error, {longitude,latitude, location} = {}) =>{
        if (error) { 
            return res.send({
                error
            })
        }   

        forecast(longitude, latitude, (error, forecastData) => {
            if (error) { 
                return res.send({
                    error
                })
            }

            res.send({
                location: location,
                forecast: forecastData,
                address: address
            })
        })
    })
})

app.get('/products',(req, res) =>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term.'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) =>{
    res.render('404',{
        title: '404 Error',
        errorMessage: 'Help article not found.',
        name: 'Vítor Santos'
    })

})

app.get('*', (req,res) =>{
    res.render('404',{
        title: '404 Error',
        errorMessage: 'Page not found.',
        name: 'Vítor Santos'
    })
})

app.listen(port,() =>{

    console.log("Server is up on port " + port);
})