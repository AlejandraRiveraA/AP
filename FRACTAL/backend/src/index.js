//index.js
const app = require ('./app');
require('./databases/mongodb');
//require('./databases/mysql')
//require('./databases/neo4j')
require('./databases/redis')



async function main(){
    await app.listen(app.get('port')); //trae desde app el valor de port.
    console.log('server on port: ', app.get('port'));

}

main();