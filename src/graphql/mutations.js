import { gql } from 'apollo-boost';

export const LOGIN = gql`
    mutation loginUser($username: String!, $password: String!) {
        authorize(credentials: { username: $username, password: $password }) {
            accessToken
        }
    }
`;
