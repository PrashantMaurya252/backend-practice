// this file will tell that what will be structure of your data

const {gql} = require('graphql-tag')
// String
// Int
// Float
// Boolean
// ID -> an unique identifier
const typeDefs = gql`
type Product {
id:ID!
title:String!
category:String!
price:Float!
inStock:Boolean!
} 
type Query{
    products:[Product!]!
    product(id:ID!):Product
}`;

module.exports = typeDefs;

