const request = require('postman-request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYW5kcmlpcCIsImEiOiJja2p3czEwaXcwYXNuMndwZ3ZkcTN3Z2h6In0.nKvnRROdfuG0wa2nZcqPwA&limit=1`

    request({ url, json: true },
        function (error, { body }) {
            if (error) {
                callback('Unable to connect to server.', undefined);
            } else if (!body.features.length) {
                callback('There has no been any location found. Try another search.', undefined)
            }
            else {
                callback(undefined, {
                    latitude: body.features[0].center[0],
                    longitude: body.features[0].center[1],
                    location: body.features[0].place_name
                })

            }
        });
}

const geocodeReverse = ({longitude, latitude}, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1IjoiYW5kcmlpcCIsImEiOiJja2p3czEwaXcwYXNuMndwZ3ZkcTN3Z2h6In0.nKvnRROdfuG0wa2nZcqPwA&limit=1`

    request({ url, json: true },
        function (error, { body }) {
            if (error) {
                callback('Unable to connect to server.', undefined);
            } else if (!body.features.length) {
                callback('There has no been any location found. Try another search.', undefined)
            }
            else {
                callback(undefined, {
                    latitude: body.features[0].center[0],
                    longitude: body.features[0].center[1],
                    location: body.features[0].place_name
                })

            }
        });
}

module.exports = {geocode, geocodeReverse}