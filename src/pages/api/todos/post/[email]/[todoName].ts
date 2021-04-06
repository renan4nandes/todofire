import { NextApiRequest, NextApiResponse } from 'next'
import { connectDB } from '../../../../../lib/connectDB'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const db = await connectDB()
    const collection = db.collection('todos')

    const { todoName, email } = req.query

    await collection.insertOne({ name: todoName, email })

    return res.json({ message: `Todo ${todoName} saved` })
}