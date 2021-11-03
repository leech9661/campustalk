const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

const MongoClient = require('mongodb').MongoClient;
app.set('view engine', 'ejs');


app.get('/', function(req, res) {
	res.sendFile(__dirname + 'index.html')
})

app.get('/', (req, res) => {
	res.sendFile (__dirname + 'index.html')
})
// server와 browser가 연결될때까지 기다리는 것
app.listen(3000, function() {
        console.log('listening on 3000')
})

app.use('/public', express.static('public'));


