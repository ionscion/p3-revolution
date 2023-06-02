const {Schema, model} = require('mongoose');

const addressSchema = new Schema(
        {
            street: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            state: {
                type: String,
                required: true,
            },
            postcode: {
                type: Number,
                required: true,
            },
            client_id: {
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

const Address = model('Address', addressSchema);
module.exports = Address;
        