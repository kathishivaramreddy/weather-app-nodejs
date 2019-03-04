const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/9eb157f08d18d1141d9a79f1f23df145/' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out.Temperature High today is '+  body.daily.data[0].temperatureHigh+' and Low today is '+ body.daily.data[0].temperatureLow +' There is a ' + body.currently.precipProbability + '% chance of rain.')
        
        }
    })
}

module.exports = forecast