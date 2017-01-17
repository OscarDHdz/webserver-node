const express = require('express');
const hbs    = require('hbs');
const fs = require('fs');

var app = express();

// Whre VPartials Are
hbs.registerPartials(__dirname + '/views/partials');
// Set Expres render engine -hbs-
app.set('view engine', 'hbs');


// Express Middleware
app.use((req, res, next) => {

  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);

  fs.appendFile('server.log', log + '\n', (err) => {
    if ( err ) {
      console.log('Unable to append to server.log');
    }
  });

  next();
});
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// })
app.use(express.static(__dirname + '/public'));


// Custome Functions at render
hbs.registerHelper('getCurrentYear', () => {
  return  new Date().getFullYear();
});
hbs.registerHelper('screamIt', ( message ) => {
  return message.toUpperCase();
});


app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');

  /*res.send({
    name: 'Oscar',
    likes: [
      'Brenda',
      'Cats'
    ]
  });*/

  /*res.render('home.hbs', {
    pageTitle: 'Bienvenido!',
    currentYear: new Date().getFullYear(),
    welcomeMessage: 'Hola!'
  });*/

  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Hola a mi pagina!'
  });


});
// Render a Template
app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'Custome Title',
  });
});
// GET a JSON as a respons
app.get('/json', (req, res) => {
  res.send({
    name: 'Oscar',
    likes: [
      'Brenda',
      'Cats'
    ]
  });
})


app.listen(3000);
