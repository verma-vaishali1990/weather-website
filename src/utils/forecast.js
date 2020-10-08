const request = require('request')

const forecast = (latitude,longitude,callBack) =>{
    const url = 'http://api.weatherstack.com/current?access_key=5d1345cf43f5db66870dbae13d08feb0&query='+latitude+','+longitude
    request({url, json:true},(error,{body})=>{
    if(error){
       callBack('Unable to connect to weather service',undefined)
    }else if(body.error){
        callBack('Unable to find location',undefined)
    }else{
        callBack(undefined, body.current.weather_descriptions[0] +'. It is currently '+ body.current.temperature+' out. Feels like '+body.current.feelslike)
    } 
    })
}

module.exports = forecast