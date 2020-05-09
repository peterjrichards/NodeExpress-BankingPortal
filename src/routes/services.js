const express = require('express');
const data = require('../data');

const router = express.Router();
const accounts = data.accounts;
const writeJSON = data.writeJSON;

router.get('/transfer', function(req, res){
  res.render('transfer');
});
router.post('/transfer', function(req, res){
    accounts[req.body.from].balance -= parseInt(req.body.amount);
    accounts[req.body.to].balance += parseInt(req.body.amount);
    data.writeJSON();
    res.render('transfer', { message: "Transfer Completed" });
});
router.get('/payment', function(req, res){
  res.render('payment', {account: accounts.credit});
});
router.post('/payment', function(req, res){
  accounts.credit.balance -= parseInt(req.body.amount);
  accounts.credit.available += parseInt(req.body.amount);
  data.writeJSON();
  res.render('payment', { message: "Payment Successful", account: accounts.credit });
});

module.exports = router;
