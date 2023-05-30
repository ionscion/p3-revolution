import {gql} from '@apollo/client';

export const GET_CLIENTS = gql`
    query GetClients {
        clients {
            id
            name
            email
            phone
            address
            city
            state
            zip
            user_id
        }
    }
`;