const { Client, Beneficiary } = require("../models");

const resolvers = {
  Query: {
    getClients: async (parent, { user_id }) => {
      return await Client.find({ user_id }).populate("beneficiaries");
    },
    getClientNoAuth: async (parent, args) => {
      return await Client.find({});
    },
    getClientById: async (parent, { _id }) => {
      console.log("something hit the route");
      return await Client.findById(_id).populate("beneficiaries");
    },

    getBeneficiariesById: async (parent, { Client_id }) => {
      const client = await Client.findById(Client_id).populate("beneficiaries");
      return client.beneficiaries;
    },
  },
  Mutation: {
    createClient: async (parent, args) => {
      return await Client.create(args);
    },
    updateClient: async (parent, { client_id, input }) => {
      const updatedClient = await Client.findByIdAndUpdate(
        { _id: client_id },
        input,
        {
          new: true,
        }
      );
      return updatedClient;
    },
    createBeneficiary: async (parent, args) => {
      const newBeneficiary = await Beneficiary.create(args);
      const updatedClient = await Client.findByIdAndUpdate(
        args.clientId, // Use clientId to find the client by its ObjectId
        { $push: { beneficiaries: newBeneficiary._id } },
        { new: true }
      );
      return newBeneficiary;
    },
  },
};

module.exports = resolvers;
