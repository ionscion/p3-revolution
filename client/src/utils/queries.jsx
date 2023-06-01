import { gql } from "@apollo/client";

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
  }
}
`;

// query Query($id: ID!) {
//   getClientById(_id: $id) {
//     birthday
//     email
//     created_at
//     first_name
//     is_active
//     last_name
//     middle_name
//     phone_number
//     user_id
//     _id
//     updated_at
//   }
// }