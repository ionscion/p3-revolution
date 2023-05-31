import { gql } from "@apollo/client";

export const GET_CLIENTS = gql`
  query getClients {
     getClients {
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
