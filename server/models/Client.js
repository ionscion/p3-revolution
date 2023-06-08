const { Schema, model } = require("mongoose");

const clientSchema = new Schema(
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
    user_id: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: false,
      default: null,
    },
    city: {
      type: String,
      required: false,
      default: null,
    },
    state: {
      type: String,
      required: false,
      default: null,
    },
    postcode: {
      type: Number,
      required: false,
      default: null,
    },
    beneficiaries: [
      {
        type: Schema.Types.ObjectId,
        ref: "Beneficiary",
      },
    ],
    financials: [
      {
        type: Schema.Types.ObjectId,
        ref: "Financial",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Client = model("Client", clientSchema);

module.exports = Client;
