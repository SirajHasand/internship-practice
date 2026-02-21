const {Pool} = require('pg');
require('dotenv').config();
const pool = new Pool({
    user:process.env.DB_USER || 'postgres',
    password:process.env.DB_PASSWORD || 'post123',
    host:process.env.DB_HOST || 'localhost',
    port:process.env.DB_PORT || 5432,
    database:process.env.NAME || 'pern_database'

});
 //tEST THE CONNETION ON STARTUP
 pool.connect((err,client, reslase)=>{
    if(err){
        console.error(' Error conneciton postgreSQL',err.message)

    }else{
        console.log('conneted to postgres db');
        reslase();
    }
 })

module.exports = {pool};