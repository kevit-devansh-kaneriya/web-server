const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+ address +'/2023-09-12?unitGroup=us&key=HZFNHHVVGNTLW7Z5S946TVEQC'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else {
            callback(undefined, {
                latitude: body.latitude,
                longitude: body.longitude,
                location: body.address
            })
        }
    })
}

module.exports = geocode