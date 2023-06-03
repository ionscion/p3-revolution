import {gql} from '@apollo/client';

export const CREATE_CLIENT = gql`
    mutation CreateClient($firstName: String!, $lastName: String!, $email: String!, $phoneNumber: String!, $user_id: String!) {
    createClient(first_name: $firstName, last_name: $lastName, email: $email, phone_number: $phoneNumber, user_id: $user_id) {
      _id
      first_name
      last_name
      email
      phone_number
    }
  }
`;

export const UPDATE_CLIENT = gql`
    mutation UpdateClient($id: ID!, $firstName: String!, $lastName: String!, $email: String!, $phoneNumber: String!) {
    updateClient(_id: $id, first_name: $firstName, last_name: $lastName, email: $email, phone_number: $phoneNumber) {
      _id
      first_name
      last_name
      email
      phone_number
    }
    }
`;

