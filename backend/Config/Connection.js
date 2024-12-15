const mongoose = require('mongoose');

async function ConnectedToDb(url){
   return mongoose.connect(url);

}

module.exports = ConnectedToDb;