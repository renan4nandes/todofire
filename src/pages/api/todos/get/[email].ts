import { NextApiRequest, NextApiResponse } from 'next'
import { connectDB } from '../../../../lib/connectDB'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const db = await connectDB()
    const collection = db.collection('todos')

    const { email } = req.query

    const todos = await collection.find({ email }).toArray()

    return res.json(todos)
}