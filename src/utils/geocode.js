const request = require('request');

const geocode = (address, callback) => {
  
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + ' .json?access_token=pk.eyJ1Ijoic29mdHNhbSIsImEiOiJjazVkMDQ4NDcxdzgyM2xwZzJ5ZzJ2aHpvIn0.4_bbU_9nNEy4OyQrZRZ_hA';

 request({url, json: true}, (error, { body }) => {
    if(error){
      callback('Unable to connect to location services!', undefined);
    }else if(body.features.length === 0){
     callback('Unable to connect to location services!. Try another search', undefined);
    }else{
      callback(undefined, {
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
        location: body.features[0].place_name

      })
    }
 })
 
}

module.exports = geocode;