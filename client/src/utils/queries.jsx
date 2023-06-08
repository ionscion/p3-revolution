import { gql } from "@apollo/client";

//Client Data

export const GET_CLIENTS = gql`
  query GetClients($userId: String!) {
    getClients(user_id: $userId) {
      _id
      birthday
      created_at
      email
      first_name
      is_active
      last_name
      middle_name
      phone_number
      updated_at
      user_id
      street
      city
      state
      postcode
    }
  }
`;

export const GET_CLIENTNOAUTH = gql`
  query GetClientNoAuth {
    getClientNoAuth {
      _id
      birthday
      created_at
      email
      first_name
      is_active
      last_name
      middle_name
      phone_number
      updated_at
      user_id
    }
  }
`;

export const GET_CLIENT = gql`
  query GetClientById($id: ID!) {
    getClientById(_id: $id) {
      birthday
      email
      created_at
      first_name
      is_active
      last_name
      middle_name
      phone_number
      user_id
      _id
      updated_at
      street
      city
      state
      postcode
    }
  }
`;

export const GET_BENEFICIARIES = gql`
query GetBeneficiariesById($clientId: ID!) {
  getBeneficiariesById(Client_id: $clientId) {
    _id
    first_name
    middle_name
    last_name
    email
    phone_number
    birthday
    is_active
    created_at
    updated_at
    relationship
    user_id
    percentage
  }
}
`;

export const GET_FINANCIALS = gql`
  query GetFinancials($clientId: ID!) {
    getFinancials(Client_id: $clientId) {
      _id
    }
  }
`;
