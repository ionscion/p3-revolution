const { Client } = require("../models");

const resolvers = {
  Query: {
    getClients: async (parent, { user_id }) => {
      return await Client.find({ user_id });
    },
    getClientNoAuth: async (parent, args) => {
      return await Client.find({});
    },
    getClientById: async (parent, { _id }) => {
      console.log("something hit the route");
      return await Client.findById(_id);
    },
  },
  Mutation: {
    createClient: async (parent, args) => {
      return await Client.create(args);
    },
    updateClient: async (parent, { client_id, input }) => {
      return await Client.findOneAndUpdate({ _id: client_id }, input, {
        new: true,
      });
    },
  },
};

module.exports = resolvers;
