import { NextApiRequest, NextApiResponse } from 'next'
import { connectDB } from '../../../../lib/connectDB'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const db = await connectDB()
    const collection = db.collection('todos')

    const { id } = req.query

    await collection.deleteOne({ _id: id })

    return res.json({ message: `Todo ${id} deleted` })
}