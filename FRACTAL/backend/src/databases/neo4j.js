
const neo4j = require("neo4j-driver");

const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', '1234'));

const session = driver.session();


module.exports.createUser = function(username){
    (async()=>{
        try{
            const res = await session.run(
                "Create(n:Usuario{username: $username}) return n" ,
                {username: username}
            )
            const record = res.records[0]
            const node = record.get(0)

            console.log(node.properties.username)
        }finally{
           await session.close() 
        }
    })
}

module.exports.createProduct = function(title, idProduct){
    (async()=>{
        try{
            const res = await session.run(
                "Create(n:Product{name: $title, id: $id}) return n" ,
                {title: title, id: idProduct}
            )
        }catch(err){
           console.log(err.message)
        }finally{
           await session.close() 
        }
    })
}

module.exports.setFollow = function(idUser1, idUser2){
    (async()=>{
        try{
            const res = await session.run(
                "MATCH(a:Usuario{id: $id1}),(b:Usuario{id:$id2}) merge (a)-[r:Follows]->(b)" ,
                {id1:idUser1, id2: idUser2}
            )
        }catch(err){
            console.log(err.message)
        }finally{
           await session.close() 
        }
    })
}


