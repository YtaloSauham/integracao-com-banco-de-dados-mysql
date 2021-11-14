require('dotenv').config();

const knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      port: process.env.DATABASE_PORT,
      user : 'root',
      password :'',
      database : 'produto'
    }
  });

  module.exports=knex