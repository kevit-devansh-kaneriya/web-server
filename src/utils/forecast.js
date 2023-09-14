const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+ latitude + ',' + longitude+ '?key=HZFNHHVVGNTLW7Z5S946TVEQC' 

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.days[0].conditions + ' It is currently ' + body.currentConditions.temp + ' degress out. There is a ' + body.currentConditions.precipprob + '% chance of rain comes.')
        }
    })
}

module.exports = forecast