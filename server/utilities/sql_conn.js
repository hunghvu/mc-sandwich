// Obtain a Pool of DB connections. 
const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    }
})

// Use this for local testing and development.
// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL
//     // Use this to work around with SSL rejection on local server
//         || 'postgresql://postgres:root@localhost:5432/postgres',
//     ssl: process.env.DATABASE_URL ? true : false
// })

module.exports = pool
