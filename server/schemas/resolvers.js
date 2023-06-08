const { Client, Beneficiary, Financial} = require("../models");

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
    getFinancials: async (parent, { Client_id }) => {
      return await Financial.find({ Client_id });
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
    updateBeneficiary: async (parent, { beneficiary_id, input }) => {
      const updatedBeneficiary = await Beneficiary.findByIdAndUpdate(
        { _id: beneficiary_id },
        input,
        {
          new: true,
        }
      );
      return updatedBeneficiary;
    },
    deleteBeneficiary: async (parent, { beneficiary_id }) => {
      const deletedBeneficiary = await Beneficiary.findByIdAndDelete({
        _id: beneficiary_id,
      });
      return deletedBeneficiary;
    },
  },
};

module.exports = resolvers;
