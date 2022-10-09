export const schema = gql`
  type ZipSearch {
    id: String!
    zip: String!
    date: DateTime!
  }

  type Query {
    zipSearches: [ZipSearch!]! @requireAuth
    zipSearch(id: String!): ZipSearch @requireAuth
  }

  input CreateZipSearchInput {
    zip: String!
    date: DateTime!
  }

  input UpdateZipSearchInput {
    zip: String
    date: DateTime
  }

  type Mutation {
    createZipSearch(input: CreateZipSearchInput!): ZipSearch! @requireAuth
    updateZipSearch(id: String!, input: UpdateZipSearchInput!): ZipSearch!
      @requireAuth
    deleteZipSearch(id: String!): ZipSearch! @requireAuth
  }
`
