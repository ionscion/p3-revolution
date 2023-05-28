const { Schema, model} = require("mongoose");

const clientSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
      unique: true,
    },
    middle_name: String,
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone_number: {
      type: Number,
      required: true,
    },
    birthday: Date,
    is_active: {
      type: Boolean,
      default: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Client = model("Client", clientSchema);

module.exports = Client;
