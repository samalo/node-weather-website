const request = require('request');

const forecast = (lat, long, callback) => {
  const url = 'https://api.darksky.net/forecast/68ac2ae7ff3fe8d4aee63f7e89c46f5b/' + lat + ',' + long;

  request({url, json:true}, (error,{body}) => {
    if(error){
      callback('Unable to connect to weather service!', undefined);

    }else if(body.error){
      callback('Unable to find location!', undefined);
    }else{
      callback(undefined, body.daily.data[0].summary + ' It is currently,' + body.currently.temperature + ' degrees out and ' + body.currently.precipProbability  + ' % chance of rain ');
    }
  })
}

module.exports = forecast;