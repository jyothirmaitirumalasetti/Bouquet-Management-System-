// config/database.js
module.exports = {
    development: {
      username: 'postgres',
      password: 'sravani940@',
      database: 'ecommerce_db',
      host: '127.0.0.1',
      dialect: 'postgres' // or 'postgres', 'sqlite', 'mariadb', 'mssql'
    },
    test: {
      username: 'postgres',
      password: 'admin',
      database: 'your_test_db_name',
      host: '127.0.0.1',
      dialect: 'mysql' // or 'postgres', 'sqlite', 'mariadb', 'mssql'
    },
    production: {
      username: 'postgres',
      password: 'admin',
      database: 'your_production_db_name',
      host: '127.0.0.1',
      dialect: 'mysql' // or 'postgres', 'sqlite', 'mariadb', 'mssql'
    }
  };
  