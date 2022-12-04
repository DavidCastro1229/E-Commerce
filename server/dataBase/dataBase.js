
const {Pool} =require('pg');


const dataBase= new Pool({
    connectionString:process.env.ecommerdb,
    ssl: {
        rejectUnauthorized: false
      }
  })
  
//   const dataBase= new Pool({
//       host:'localhost',
//     user:'postgres',
//     database:'application',
//   port:'5432',
//   password:'JDGC5052001',
// })
module.exports = dataBase
