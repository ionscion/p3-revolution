const { Client } = require('../models');

const resolvers = {
    Query: {
        getClients: async (parent, args) => {
           return await Client.find({});
        },
        getClientNoAuth: async (parent, args) => {
            return await Client.find({});
        }
    },
    Mutation: {
        createClient: async (parent, args) => {
            return await Client.create(args);
        },
    }
  
};

module.exports = resolvers;