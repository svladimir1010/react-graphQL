const express = require( 'express' )
const { graphqlHTTP } = require( 'express-graphql' )
const schema = require( '../schema/schema' )

const app = express()


app.use( '/graphql', graphqlHTTP( {
    schema,
    graphiql: true,
} ) )

const PORT = 3005
app.listen( PORT, err => err
    ? console.log( err.message )
    : console.log( `Server Started on ${ PORT } !!!` ) )







