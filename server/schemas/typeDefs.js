const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    name: String!
    email: String!
    user_id: String!
    clients: [Client]
  }

  type Client {
    _id: ID
    first_name: String
    middle_name: String
    last_name: String
    email: String
    phone_number: String
    birthday: String
    street: String
    city: String
    state: String
    postcode: Int
    is_active: Boolean
    created_at: String
    updated_at: String
    user_id: String!
  }

  type Address {
    _id: ID
    street: String!
    city: String!
    state: String!
    postcode: Int!
    client_id: String!
  }

    input ClientInput {
    first_name: String
    middle_name: String
    last_name: String
    email: String
    phone_number: String
    birthday: String
    street: String
    city: String
    state: String
    postcode: Int
    user_id: String
    }

  type Query {
    me: User
    getClients(user_id: String!): [Client]
    getClientNoAuth: [Client]
    getClientById(_id: ID!): Client
  }

  type Mutation {
    createClient(
      first_name: String!
      middle_name: String
      last_name: String!
      email: String!
      phone_number: String!
      birthday: String
      user_id: String
    ): Client
    updateClient(client_id: ID!, input: ClientInput): Client
    deleteClient: Client
  }
`;

module.exports = typeDefs;
