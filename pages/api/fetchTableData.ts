// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from 'next'
import conn from '../../utils/db';

// type Data = {
//   name: string
// }

export default async function handler(req,res) 
{
    try {
        
        // const {responseID, formID, user,responseData,created_at} = req.body;
        const {formID} = req.body;
        console.log('formID : ', formID);
        var query = `SELECT * from public."Response" WHERE "Form_id"='${formID}'`;

        console.log(query);

        const results = await conn.query(query);
     console.log('response from DB ', results);

    if(results.rowCount>0)
    { console.log('All form submissions fetched from DB! ')
        res.status(200).json({ message: 'ok', data: results.rows })
      
    }
    else{
        console.log('No form submissions found in DB! ', results.rowCount)
        res.status(200).json({ message: 'ok', data: [] })
    }
      
    } catch (error) {
      console.log("Error: ",error)
      res.status(404).json({message: "Something went wrong! Please check console"})      
    }
    

}