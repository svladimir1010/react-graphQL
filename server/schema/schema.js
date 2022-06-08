const graphql = require( 'graphql' )
// const { buildSchema } = require('graphql');

const { GraphQLObjectType, GraphQLString } = graphql

const MovieType = new GraphQLObjectType( {
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
    }),
} )

