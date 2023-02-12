import type { NextApiRequest, NextApiResponse } from 'next'
import { generateUUID } from '../../services/generateUUID';
import conn from '../../utils/db';

type Data = {
  name: string
}

export default async function handler(req,res) 
{
    try {
      const {user} = req.body;
      console.log('User : ', user)
      
     // var query = `INSERT INTO form (formID, formHeading, formAreaItems) VALUES ('${formID}', '${formHeading}', '${formAreaItems}')`
      var query = `SELECT * from public."Form" WHERE "user_id" = '${user}'`;
      console.log(query);
      
      const results = await conn.query(query);
    //  console.log('response fro DB ', results);
    if(results.rowCount>0)
    {
        res.status(200).json({ message: 'ok', data: results.rows })
      
    }
  
        
    } catch (error) {
    console.log(error)
    res.status(404).json({message: "Something went wrong! Please check console"})      
    }

}
