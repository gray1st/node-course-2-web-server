const express = require('express');
const hbs = require('hbs');
const fs = require('fs');



var app = express();

hbs.registerPartials(__dirname + '/views/partials') //Setup Partials
app.set('view engine', 'hbs');
app.use(express.static(__dirname +'/public')); //Add Middleware for static files

app.use((req, res, next) =>{
  var now = new Date().toString();
  var log = now + req.method + req.url
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) =>{
      if (err){
      console.log('An Error Occured writing to the log');
    }
  });
  next(); //must call next in middleware to continue
});

// Maintenance Mode
//app.use((req,res,next) =>{
//  res.render('maintenance.hbs');
//  //If no next() then will never move on.
//});


hbs.registerHelper('getCurrentYear', () =>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) =>{
  return text.toUpperCase();
});

app.get('/', (req,res) => {
  res.render('home.hbs', {
    title: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  });
});

app.get('/about', (req,res) => {
  res.render('about.hbs', {
    title: 'New About Page'
  });
});  //Render Page using HBS

app.get('/bad', (req,res) => {
  res.send({
      errorMessage: 'The Error Here'
  });
});

app.listen(3000, ()=>{
  console.log('Server Running on Port 3000')
});
