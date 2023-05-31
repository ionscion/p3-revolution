import { gql } from "@apollo/client";

//top query may be wrong but that's the one needing to fix for auth

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
