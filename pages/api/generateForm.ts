// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { generateUUID } from '../../services/generateUUID';

type Data = {
  name: string
}

export default async function handler(req,res) 
{

    const {formHeading,formData} = req.body;
    const formID = generateUUID();
    const dataToSend ={formHeading,formID,formData}
    

    console.log('Data to send : ', dataToSend)


  res.status(200).json({ name: 'John Doe' })
}
