//console.log('CHECK EVERYTHING FOR A MISSING , IN ROUTERS!!!!!!!!!!!!!!!');
const express = require('express');
const router = express.Router();




//GET
router.get('/', function(req, res){
    res.render('index_doc', {
        title:'Document index'
    });
});
router.get('/add', function(req, res){
    res.render('add_doc',{
        title:'Add document'
    });
});
module.exports = router;
