import { MongoClient, Db } from 'mongodb'

let cachedDb: Db

async function connectDB(){
    if(cachedDb) return cachedDb

    const client = await MongoClient.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    const db = client.db('TodoDB')

    cachedDb = db

    return db
}

export { connectDB }