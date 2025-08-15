const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    password: 'sravani940@',
    port: 5432
});

const dbName = 'ecommerce_db';

client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .then(() => client.query(`CREATE DATABASE ${dbName}`))
    .then(() => console.log(`Database ${dbName} created`))
    .catch(err => console.error('Error creating database', err))
    .finally(() => client.end());
