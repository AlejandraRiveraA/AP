const redis = require('redis');


// Create Redis Client
let client = redis.createClient();

client.on('connect', function(){
  console.log('Connected to Redis...');
});

/*
const redis = require("redis")
module.exports = {
   createConnection : () => {
      return new Promise((resolve, reject) => {
        const client = redis.createClient()
        client.on('connect', () => {
           resolve(client)
           
        })
        client.on('error', () => {
          reject("Error: Failed to connect")
          console.log('Connected to Redis...')
         })
      })
   }
}*/