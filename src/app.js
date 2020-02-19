const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode  = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000;


//DEFINE PATHS FOR EXPRESS CONFIG
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPartial = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials');

//SETUP STATIC DIRECTORY TO SERVER
app.use(express.static(publicDirectoryPath));

//SETUP HANDLEBARS & VIEWS LOCATION
app.set('view engine', 'hbs');
app.set('views', viewsPartial);
hbs.registerPartials(partialsPath);

app.get('/', (req,res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Sam Mhondiwa'
  });
});

app.get('/weather', (req,res) => {
    if(!req.query.address){
      return res.send({
         error: 'An address must be provided'
       })
     }

     geocode(req.query.address, (error, {latitude, longitude, location}) => {
       if(error){
         return res.send({error});
       }

       forecast(latitude, longitude, (error, forecastData) => {
        if(error){
          return res.send({error});
        }

        res.send({forecast: forecastData,
                  location,
                  address: req.query.address
        })
 
       })
     })

    // res.send({
    //   forecast: 'Its Snowing',
    //   location: 'Philadelphia',
    //   address: req.query.address
    // });
});

app.get('/products', (req, res) => {

  if(!req.query.search){
   return res.send({
      error: 'You must provide search term'
    })
  }
  console.log(req.query.search);
  res.send({
    products:[]
  })
});

app.get('/about', (req,res) => {
  res.render('about', {
    about: 'About Weather',
    title: 'About',
    name: 'Sam Mhondiwa'
  });
});

app.get('/help', (req,res) => {
  res.render('help', {
    help: 'If you need anything just shout!!!',
    title: 'Help',
    name:'Sam Mhondiwa'
  });
});


app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Help page'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    errorMessage: 'Page not found'
  });
});

app.listen(port, () => {
  console.log('Running on port 3000' + port);
})