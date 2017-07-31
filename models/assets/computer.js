let mongoose = require('mongoose');

let computerSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    OperatingSystem:{
        type: String
    },
    Lokasjon:{
        type: String
    },
    Bruker:{
        type: String
    },
    IpAdress:{
        type: String
    },
    MACAdresse:{
        type: String
    },
    Tilkoblinger:{
        type: String
    },

})

//let Article = module.exports = mongoose.model('Article', articleSchema);
let computerAsset = module.exports = mongoose.model('Computer', computerSchema);
