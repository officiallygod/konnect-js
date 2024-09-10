// FIREBASE INIT
var admin = require( "firebase-admin" );

var serviceAccount = require( "./permissions/permissions.json" );

admin.initializeApp( { credential: admin.credential.cert( serviceAccount ), databaseURL: "https://konnect-officiallygod-default-rtdb.firebaseio.com" } );

// REQUIRE FILES
const hbs = require( 'hbs' )
const path = require( 'path' )
const express = require( 'express' )
var bodyParser = require( 'body-parser' );
const konnectSnd = require( './utils/addKonnect' );
const konnectRcv = require( './utils/getKonnect' );

const app = express()
const port = process.env.PORT || 3000

app.use( bodyParser.json() );

app.use( bodyParser.urlencoded( { extended: true } ) );

app.use( function ( req, res, next ) {
    res.header( "Access-Control-Allow-Origin", "*" );
    res.header( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" );
    next();
} );

// Paths
const publicPath = path.join( __dirname, '../public' )
const viewsPath = path.join( __dirname, '../templates/views' )
const partialsPath = path.join( __dirname, '../templates/partials' )

// Handle Bar Setup
app.set( 'view engine', 'hbs' )
app.set( 'views', viewsPath )
hbs.registerPartials( partialsPath )

// Root Route Static
app.use( express.static( publicPath ) )

// Main Page
app.get( '', ( req, res ) => {
    res.render( 'login', { title: 'Default' } )
} )

// Register Page
app.get( '/register', ( req, res ) => {
    res.render( 'register', { title: 'Register' } )
} )

// Login Page
app.get( '/login', ( req, res ) => {
    res.render( 'login', { title: 'Login' } )
} )

// Home Page
app.get( '/home', ( req, res ) => {

    res.render( 'home', { title: 'Home Page' } )
} )

// Forgot Page
app.get( '/forgot', ( req, res ) => {
    res.render( 'forgot', { title: 'Forgot Password' } )
} )

// About Page
app.get( '/about', ( req, res ) => {
    res.render( 'about', { title: 'About' } )
} )

// Konnect API Page
app.post( '/konnectsnd', async ( req, res ) => {

    if ( !req.body ) {
        return res.send( { error: 'Please provide valid Data!' } )
    }

    konnectSnd( req.body, ( error, status = {} ) => {
        if ( error !== undefined ) {

            return res.send( { error: error } )
        } else {
            return res.sendStatus( status )
        }
    } )
} )

// Konnect API Page
app.get( '/konnectrcv', async ( req, res ) => {

    if ( !req.query.id ) {
        return res.send( { error: 'Please provide valid Data!' } )
    }

    konnectRcv( req.query.id, ( error, status = {} ) => {

        if ( error !== undefined ) {

            console.log( error )
            return res.send( { error: 'Please provide valid Data!' } )
        } else {
            return res.send( status )
        }
    } )
} )

// 404 Error Page
app.get( '*', ( req, res ) => {
    res.render( 'error', { title: 'Error Page' } )
} )


// Start Server on Port
app.listen( port, () => {

    console.log( 'Server Started on ' + port + '...' );
} )
