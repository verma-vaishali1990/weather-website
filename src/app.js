const path = require('path')
const express = require('express')
const request = require('request')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const staticDir = path.join(__dirname,'../static')
const templatePath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//Set handlebars engine and view location
app.set('view engine','hbs')
app.set('views',templatePath)
hbs.registerPartials(partialsPath)

//Set up static directory to serve
app.use(express.static(staticDir))
app.get('',(req,res) =>{
    res.render('index',{
        title:'Weather App',
        author : 'Vaishali'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title :'About Us',
        established:'2020',
        author : 'Vaishali'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Here to Help!!',
        helpMsg:'Call 9999999999',
        author : 'Vaishali'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
            return res.send({
                error: 'No address provided for weather app'
            })
    }
    else{
        geoCode(req.query.address,(error,{latitude,longitude,location}={}) =>{
            if(error){
            return console.log('Errror ',error)
            }
            forecast(latitude,longitude,(error,forecastData) =>{
                    if(error){
                        return console.log(error)
                    }
                    return res.send({
                       forecast: forecastData,
                       location : location,
                       address :req.query.address
                    })
                })    
        })
    }
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        errorDesc:'Help article not found ',
        author : 'Vaishali'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        errorDesc:'Page not found ',
        author : 'Vaishali'
    })
})

app.listen(port,()=>{
    console.log('Server started on port '+port)
})