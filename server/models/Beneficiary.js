const { Schema, model } = require("mongoose");

const beneficiarySchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    middle_name: String,
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone_number: {
      type: Number,
      required: true,
    },
    birthday: String,
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
    relationship: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: "Client",
    },
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

const Beneficiary = model("Beneficary", beneficiarySchema);
module.exports = Beneficiary;
