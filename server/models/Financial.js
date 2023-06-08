const {Schema, model} = require('mongoose');

const financialSchema = new Schema(
    {
        account_name: {
            type: String,
            required: true,
        },
        account_number: {
            type: Number,
            required: true,
        },
        account_type: {
            type: String,
            required: true,
        },
        bank_name: {
            type: String,
            required: false,
        },
        account_balance: {
            type: Number,
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

const Financial = model("Financial", financialSchema);

module.exports = Financial;