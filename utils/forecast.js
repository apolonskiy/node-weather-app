const request = require('postman-request');
const forecast = (longitude, latitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=9e5dacc27528cbb2bc5df9e78174717c&query=${longitude},${latitude}`;
    request({ url, json: true },
        function (error, { body }   ) {
            if (error) {
                callback('Could not connect to weather server.', undefined)
            } else if (body.error) {
                callback(body.error, undefined)
            }
            else {
                callback(undefined, `${body.current.weather_descriptions}. It is currently ${body.current.temperature} degree, but feels like ${body.current.feelslike} degree. The humidity is ${body.current.humidity}%.`);
            }

        });
}

module.exports = forecast;