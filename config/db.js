require('dotenv').config();

const knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      port: 3306,
      user : process.env.DATABASE_USER,
      password :process.env.DATABASE_PASSWORD,
      database : 'produto'
    }
  });

  module.exports=knex