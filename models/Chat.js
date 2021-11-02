var mongoose = require('mongoose');
var Counter = require('./Counter');

// schema
var chatSchema = mongoose.Schema({
  title:{type:String, required:[true,'Title is required!']},
  body:{type:String, required:[true,'Body is required!']},
  author:{type:mongoose.Schema.Types.ObjectId, ref:'user', required:true},
  views:{type:Number, default:0},
  numId:{type:Number},
  attachment:{type:mongoose.Schema.Types.ObjectId, ref:'file'},
  createdAt:{type:Date, default:Date.now},
  updatedAt:{type:Date},
});

chatSchema.pre('save', async function (next){
  var chat = this;
  if(chat.isNew){
    counter = await Counter.findOne({name:'chat'}).exec();
    if(!counter) counter = await Counter.create({name:'chat'});
    counter.count++;
    counter.save();
    chat.numId = counter.count;
  }
  return next();
});

// model & export
var Chat = mongoose.model('chat', chatSchema);
module.exports = Chat;