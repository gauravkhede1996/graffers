const express = require('express');
const port = 8000;
const db = require('./config/mongoose');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use('/', require('./routes'));

app.listen(port, function(err) {
    if(err) {
    console.log(err);
    }
    console.log("Server is up and running")
})