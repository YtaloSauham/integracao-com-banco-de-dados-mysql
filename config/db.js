require('dotenv').config();

const knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      port: process.env.DATABASE_PORT,
      user : process.env.DATABASE_USER,
      password :process.env.DATABASE_PASSWORD,
      database : 'produtos'
    }
  });

  module.exports=knex