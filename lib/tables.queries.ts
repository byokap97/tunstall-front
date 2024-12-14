import { gql } from "@apollo/client";

export const GET_TABLES = gql`
  query GetTables {
    tables {
      id
      state
      request {
        id
        description
        price
      }
    }
  }
`;

export const SUBSCRIBE_TABLE_STATE = gql`
  subscription OnTableStateChanged {
    newTableState {
      id
      state
      request {
        id
        description
        price
      }
    }
  }
`;
