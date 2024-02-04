// pages/api/data.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await axios.get('http://10.0.2.250:8080/');
    // Process response data here
    res.status(200).json(response.data);
  } catch (error) {
    // Handle error here
    res.status(500).json({ message: 'Error fetching data' });
  }
}
