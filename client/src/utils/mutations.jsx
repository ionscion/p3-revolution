import { gql } from "@apollo/client";

export const CREATE_CLIENT = gql`
  mutation CreateClient(
    $firstName: String!
    $lastName: String!
    $email: String!
    $phoneNumber: String!
    $user_id: String!
  ) {
    createClient(
      first_name: $firstName
      last_name: $lastName
      email: $email
      phone_number: $phoneNumber
      user_id: $user_id
    ) {
      _id
      first_name
      last_name
      email
      phone_number
    }
  }
`;

export const UPDATE_CLIENT = gql`
  mutation updateClient($clientId: ID!, $input: ClientInput) {
    updateClient(client_id: $clientId, input: $input) {
      _id
    }
  }
`;

export const CREATE_BENEFICIARY = gql`
  mutation CreateBeneficiary(
    $firstName: String!
    $lastName: String!
    $email: String!
    $phoneNumber: String!
    $relationship: String!
    $percentage: Int!
    $clientId: ID!
  ) {
    createBeneficiary(
      first_name: $firstName
      last_name: $lastName
      email: $email
      phone_number: $phoneNumber
      relationship: $relationship
      percentage: $percentage
      clientId: $clientId
    ) {
      _id
      first_name
      middle_name
      last_name
      email
      phone_number
      birthday
      is_active
      updated_at
      relationship
      user_id
      percentage
      created_at
    }
  }
`;

export const UPDATE_BENEFICIARY = gql`
  mutation UpdateBeneficiary($beneficiaryId: ID!, $input: BeneficiaryInput) {
    updateBeneficiary(beneficiary_id: $beneficiaryId, input: $input) {
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

export const DELETE_BENEFICIARY = gql`
  mutation DeleteBeneficiary($beneficiaryId: ID!) {
    deleteBeneficiary(beneficiary_id: $beneficiaryId) {
      _id
    }
  }
`;

export const CREATE_FINANCIAL = gql`
  mutation CreateFinancial(
    $accountName: String!
    $accountNumber: Int!
    $accountType: String!
    $accountBalance: Int!
    $clientId: ID!
    $bankName: String
  ) {
    createFinancial(
      account_name: $accountName
      account_number: $accountNumber
      account_type: $accountType
      account_balance: $accountBalance
      clientId: $clientId
      bank_name: $bankName
    ) {
      _id
      user_id
      account_name
      account_number
      account_type
      bank_name
      account_balance
    }
  }
`;
