const fs = require('fs');
const path = require('path');
const express = require('express');
const data = require('./data');
const accountRoutes = require('./routes/accounts');
const servicesRoutes = require('./routes/services');

const app = express();
const port = 3000;

var users = data.users;
var accounts = data.accounts;

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extend: true}));

app.use('/account', accountRoutes);
app.use('/services', servicesRoutes);

app.get('/', function(req, res){
  res.render('index', { title: 'Account Summary', accounts: accounts });
});
app.get('/profile', function(req, res){
  res.render('profile', {user: users[0]});
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
