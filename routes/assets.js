//console.log('CHECK EVERYTHING FOR A MISSING , IN ROUTERS!!!!!!!!!!!!!!!');

const Computer = require('../models/assets/computer');
const express = require('express');
const router = express.Router();
//models


//GET
router.get('/', function(req, res){
  res.render('v_asset/index_asset', {
    title:'Index Asset',
    assets:Computer
  });
});
router.get('/add', function(req, res){
  res.render('v_asset/add_asset', {
    title:'Add asset'
  });
});

//POST
router.post('/add', function(req, res){
    var name = req.body.Navn;
    //let os = req.body.operatingsystem;
    let lokasjon = req.body.lokasjon;
    let bruker = req.body.bruker;
    let ipAdress = req.body.IPADRESSE;
    let MACAdresse = req.body.MACADRESSE;
    //let tilkoblinger = req.body.tilkobling;
    let computerAsset = new Asset();
    computerAsset.name = name;
    computerAsset.Lokasjon = lokasjon;
    computerAsset.Bruker = bruker;
    computerAsset.IpAdress = ipAdress;
    computerAsset.MACAdresse = MACAdresse;

    computerAsset.save(function(err){
      if(err){
        console.log(err);
        return;
      } else {
        console.log('Success adding asset: ' + name);
        res.redirect('/');
      }
    });
});
//EDIT
router.get('/edit/:id', function(req, res){
  Asset.findById(req.params.id, function(err, asset){
    res.render('v_asset/edit_asset', {
      title:'Edit Asset'
    });
  });
});

router.post('/edit/:id', function (req, res){
  //let changeAsset = new Asset();
  //Not everything here works, IPADRESSE returns error along with Navn
  //
  let changeAsset = {};
  changeAsset.name = req.body.Navn;
  changeAsset.Lokasjon = req.body.lokasjon;
  changeAsset.Bruker = req.body.bruker;
  changeAsset.IpAdress = req.body.IPADRESSE;
  changeAsset.MACAdresse = req.body.MACADRESSE;

  let query = {_id:req.params.id}

  Asset.update(query, changeAsset, function(err){
    if(err){
      console.log(err);
      return;
    } else {
      req.redirect('/');
    }
  });
});

module.exports = router;
