var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('./config/passport');
var util = require('./util');
const { ObjectId } = require('mongodb');
var app = express();

// DB setting
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGO_DB);
var db = mongoose.connection;
db.once('open', function(){
  console.log('DB connected');
});
db.on('error', function(err){
  console.log('DB ERROR : ', err);
});

// Other settings
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(flash());
app.use(session({secret:'MySecret', resave:true, saveUninitialized:true}));
app.use('/public', express.static('public'));
// Passport
app.use(passport.initialize());
app.use(passport.session());

// Custom Middlewares
app.use(function(req,res,next){
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.currentUser = req.user;
  res.locals.util = util;
  next();
});

// Routes
app.use('/', require('./routes/home'));
app.use('/posts', util.getPostQueryString, require('./routes/posts'));
app.use('/chats', util.getPostQueryString, require('./routes/chats'));
app.use('/users', require('./routes/users'));
app.use('/comments', util.getPostQueryString, require('./routes/comments'));
app.use('/files', require('./routes/files'));

// Port setting
var port = 3000;
app.listen(port, function(){
  console.log('server on! http://localhost:'+port);
});
// Chatting

app.post('/chatroom', function(요청, 응답){

	var 저장할거 = {
	  title : '무슨무슨채팅방',
	  member : [ObjectId(요청.body.당한사람id), 요청.user._id],
	  date : new Date()
	}
  
	db.collection('chatroom').insertOne(저장할거).then(function(결과){
	  응답.send('저장완료')
	});
  });

  app.get('/chat', 로그인했니, function(요청, 응답){ 

	db.collection('chatroom').find({ member : 요청.user._id }).toArray().then((결과)=>{
	  console.log(결과);
	  응답.render('chat.ejs', {data : 결과})
	})
  
  }); 
