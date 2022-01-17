const request = require('postman-request');

const forecast = (longitude, latitude, callback) =>{

    const url = 'http://api.weatherstack.com/current?access_key=4b48398c40500f8a15ab3c9f19d13a4a&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=m'

    request({url, json: true}, (error, {body}) =>{
        if(error){
            callback("Unable to connect to the API.",undefined)
        }else if(body.error){
            callback("Unable to find the location. \nTry another search.",undefined)
        } else{
            let weather_descriptions = body.current.weather_descriptions;
            let temperature = body.current.temperature;
            let feelslike = body.current.feelslike;
            callback(undefined, weather_descriptions[0] + ". \nIt's currently " + temperature + " degress out. It feels like " + feelslike + " degress out")
        }
    })
}

module.exports = forecast
