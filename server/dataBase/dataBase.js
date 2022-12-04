
const {Pool} =require('pg');


const dataBase= new Pool({
    connectionString:"postgres://ynyfccurokdrcs:bf4ccb2d427abc2a5c2ec6c256fa55292e2c0bc8579f0b10a16be969f2eee659@ec2-44-209-24-62.compute-1.amazonaws.com:5432/dfdtrbfo5au4pc",
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
