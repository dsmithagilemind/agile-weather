export const schema = gql`
  type ZipSearch {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime
    zip: String!
    date: DateTime!
  }

  type Query {
    zipSearchesEndpoint: [ZipSearch!]
      @endpoint(url: "http://localhost:8911/zipSearchesEndpoint")
      @skipAuth
    zipSearches: [ZipSearch!] @skipAuth
    zipSearch(id: String!): ZipSearch @skipAuth
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
    createZipSearch(input: CreateZipSearchInput!): ZipSearch! @skipAuth
    updateZipSearch(id: String!, input: UpdateZipSearchInput!): ZipSearch!
      @requireAuth
    deleteZipSearch(id: String!): ZipSearch! @requireAuth
  }
`
