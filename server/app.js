const express = require( 'express' )
const { graphqlHTTP } = require( 'express-graphql' )
const schema = require( '../schema/schema' )
const mongoose = require('mongoose')
const { connection } = require( 'mongoose' )


const app = express()

const PORT = 3005
const uri = 'mongodb+srv://vladimir:pass123@cluster0.eaoqbww.mongodb.net/?retryWrites=true&w=majority'

const start = async () => {
    try {
        await mongoose.connect (uri)
        app.listen (PORT, () => console.log (`Server started !!! on PORT: ${PORT}`))
    } catch (e) {
        console.log (e.reason)
    }
}

const dbConnection = mongoose.connection
dbConnection.on('error', err => console.log(`Connection error: ${err}`))
dbConnection.once('open', () => console.log('Connected to database'))

app.use( '/graphql', graphqlHTTP( {
    schema,
    graphiql: true,
} ) )

start()




// app.listen( PORT, err => err
//     ? console.log( err.message )
//     : console.log( `Server Started on ${ PORT } !!!` ) )







