import { Product } from '@/domain/product'
import type { NextApiRequest, NextApiResponse } from 'next'

/* Sample data to simulate database */
import data from './data.json'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Product[]>
) {
    res.status(200).json(data)
}