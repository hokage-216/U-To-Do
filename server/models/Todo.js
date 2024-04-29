const { Schema, model } = require('mongoose');
const User = require('./User');

const todoSchema = new Schema({
  content: { 
    type: String, 
    required: true 
},
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true
}
});

const Todo = model('Todo', todoSchema);

module.exports = Todo;
