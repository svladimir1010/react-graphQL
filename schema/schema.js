const graphql = require( 'graphql' )

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema, GraphQLInt, GraphQLList } = graphql

const Movies = require( '../models/movie' )
const Directors = require( '../models/director' )

// const directorsJSON = [
//     { name: 'Quentin Tarantino', age: 55 },  //   62a24f8a1779699bd3fc0ba6
//     { name: 'Michael Redford', age: 72 },   //    62a250bc1779699bd3fc0ba8
//     { name: 'James McTongue', age: 51 },   //     62a250fe1779699bd3fc0ba9
//     { name: 'Guy Ritchie', age: 50 },      //     62a251481779699bd3fc0baa
// ]

// const moviesJSON = [
//     { name: 'Dead Pool', genre: 'Crime', directorId: '3' },
//     { name: '1984', genre: 'Sci-Fi', directorId: '1' },
//     { name: 'V for vendetta', genre: 'Thriller', directorId: '4' },
//     { name: 'Snatch', genre: 'Comedy', directorId: '2' },
//     { name: 'Pulp Fiction', genre: 'Action movie', directorId: '1' },
//     { name: 'Crazy boy', genre: 'Sci-Fi', directorId: '1' },
//     { name: 'V for vendetta', genre: 'Thriller', directorId: '4' },
//     { name: 'Sponge Bob', genre: 'Anime', directorId: '2' },
// ]

// const movies = [
//     { id: '1', name: 'Dead Pool', genre: 'Crime', directorId: '3' },
//     { id: '2', name: '1984', genre: 'Sci-Fi', directorId: '1' },
//     { id: '3', name: 'V for vendetta', genre: 'Thriller', directorId: '4' },
//     { id: '4', name: 'Snatch', genre: 'Comedy', directorId: '2' },
//     { id: '5', name: 'Pulp Fiction', genre: 'Action movie', directorId: '1' },
//     { id: '6', name: 'Crazy boy', genre: 'Sci-Fi', directorId: '1' },
//     { id: '7', name: 'V for vendetta', genre: 'Thriller', directorId: '4' },
//     { id: '8', name: 'Sponge Bob', genre: 'Anime', directorId: '2' },
// ]
//
// const directors = [
//     { id: '1', name: 'Quentin Tarantino', age: 55 },
//     { id: '2', name: 'Michael Redford', age: 72 },
//     { id: '3', name: 'James McTongue', age: 51 },
//     { id: '4', name: 'Guy Ritchie', age: 50 },
// ]


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
                // return directors.find( director => director.id === parent.directorId )
                return Directors.findById( parent.directorId )

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
                // return movies.filter( movie => movie.directorId === parent.id )
                return Movies.find( { directorId: parent.id } )
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
                // return movies.find( movie => movie.id === args.id )
                return Movies.findById( args.id )
            },
        },
        director: {
            type: DirectorType,
            args: { id: { type: GraphQLID } },
            resolve( parent, args ) {
                // return directors.find( director => director.id === args.id )
                return Directors.findById( args.id )
            },
        },
        movies: {
            type: new GraphQLList( MovieType ),
            resolve( parent, args ) {
                // return movies
                const data = Movies.find( {} )
                console.log( 'data ', data )
                return data
            },
        },
        directors: {
            type: new GraphQLList( DirectorType ),
            resolve( parent, args ) {
                // return directors

                return Directors.find( {} )
            },
        },
    },
} )

module.exports = new GraphQLSchema( {
    query: Query,
} )