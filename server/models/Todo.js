const { Schema, model } = require('mongoose');

const todoSchema = new Schema({
  content: { 
    type: String, 
    required: true 
},
  profile: { 
    type: Schema.Types.ObjectId, 
    ref: 'Profile', 
    required: true
}
});

const Todo = model('Todo', todoSchema);

module.exports = Todo;
