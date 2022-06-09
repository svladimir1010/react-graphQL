const graphql = require( 'graphql' )

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema, GraphQLInt, GraphQLList } = graphql

const movies = [
    { id: '1', name: 'Dead Pool', genre: 'Crime', directorId: '3' },
    { id: '2', name: '1984', genre: 'Sci-Fi', directorId: '1' },
    { id: '3', name: 'V for vendetta', genre: 'Thriller', directorId: '4' },
    { id: '4', name: 'Snatch', genre: 'Comedy', directorId: '2' },
    { id: '5', name: 'Pulp Fiction', genre: 'Action movie', directorId: '1' },
    { id: '6', name: '1984', genre: 'Sci-Fi', directorId: '1' },
    { id: '7', name: 'V for vendetta', genre: 'Thriller', directorId: '4' },
    { id: '8', name: 'Snatch', genre: 'Comedy', directorId: '2' },
]

const directors = [
    { id: '1', name: 'Quentin Tarantino', age: 55 },
    { id: '2', name: 'Michael Redford', age: 72 },
    { id: '3', name: 'James McTongue', age: 51 },
    { id: '4', name: 'Guy Ritchie', age: 50 },
]


const MovieType = new GraphQLObjectType( {
    name: 'Movie',
    description: '...',

    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        director: {
            type: DirectorType,
            resolve( parent, args ) {
                return directors.find( director => director.id === parent.directorId )
            },
        },
    }),
} )

const DirectorType = new GraphQLObjectType( {
    name: 'Director',
    description: '...',

    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        movies: {
            type: new GraphQLList( MovieType ),
            resolve( parent, args ) {
                return movies.filter( movie => movie.directorId === parent.id )
            },
        },
    }),
} )

const Query = new GraphQLObjectType( {
    name: 'Query',
    fields: {
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLID } },
            resolve( parent, args ) {
                return movies.find( movie => movie.id === args.id )
            },
        },
        director: {
            type: DirectorType,
            args: { id: { type: GraphQLID } },
            resolve( parent, args ) {
                return directors.find( director => director.id === args.id )
            },
        },
        movies: {
            type: new GraphQLList( MovieType ),
            resolve( parent, args ) {
                return movies
            },
        },
        directors: {
            type: new GraphQLList( DirectorType ),
            resolve( parent, args ) {
                return directors
            },
        },
    },
} )

module.exports = new GraphQLSchema( {
    query: Query,
} )