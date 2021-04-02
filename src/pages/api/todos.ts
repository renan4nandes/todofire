import { NextApiRequest, NextApiResponse } from 'next'
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

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const db = await connectDB()

    const collection = db.collection('todos')

    if(req.method == 'GET'){
        const { email } = req.body

        // const todos = await collection.find({ email: email }).toArray()

        // res.json(todos)
        
        const todos = await collection.find({ email: email }).toArray()

        res.json(todos)
    }

    if(req.method == 'POST'){
        const { todoName, email } = req.body

        await collection.insertOne({
            name: todoName,
            email,
            done: false
        })

        res.json({
            message: "Todo saved"
        })
    }
}