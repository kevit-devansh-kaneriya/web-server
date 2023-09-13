const request = require('request')
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();
today = yyyy+'-'+mm+'-'+dd;
// console.log(today);

const geocode = (address, callback) => {
    const url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+ address +'/'+today+'?unitGroup=us&key=HZFNHHVVGNTLW7Z5S946TVEQC'

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