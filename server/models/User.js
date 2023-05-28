const {Schema,  model} = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      user_id: {
        type: String,
        required: true,
        unique: true,
      },
    });

const User = model('User', userSchema);

module.exports = User;