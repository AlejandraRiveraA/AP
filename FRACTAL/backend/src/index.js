//index.js
const app = require ('./app');
require('./databases/mongodb');





async function main(){
    await app.listen(app.get('port')); //trae desde app el valor de port.
    console.log('server on port: ', app.get('port'));

}

main();