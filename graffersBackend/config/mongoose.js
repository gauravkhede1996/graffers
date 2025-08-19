const mongoose = require('mongoose');
// poc9z9jMBTizdxEG
// gauravkhede1996
mongoose.connect('mongodb+srv://gauravkhede1996:poc9z9jMBTizdxEG@cluster0.kn2mw6i.mongodb.net/graffersBackend?retryWrites=true&w=majority&appName=Cluster0')
const db = mongoose.connection;
db.on('error',console.error.bind(console,"Error connecting to db"));
db.once('open',function(){
    console.log("Connection with database is successfull");
})
module.exports=db;