// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { generateUUID } from '../../services/generateUUID';
import conn from '../../utils/db';

type Data = {
  name: string
}

export default async function handler(req,res) 
{
    try {
      const {formHeading,formData,formID,user} = req.body;
      var query = `do $$
      begin
      if not exists(select * from public."Form" where "Formid"='${formID}')
      then
      INSERT INTO public."Form" ("Formid","user_id","name","Form_data") VALUES('${formID}','${user}','${formHeading}', '${JSON.stringify(formData)}' );
      END IF;
      END $$;`  
      console.log(query);
        
      const results = await conn.query(query);
    //  console.log('response fro DB ', results);
      
  
      res.status(200).json({ message: 'ok' })
    } catch (error) {
      console.log("Error: ",error)
      res.status(404).json({message: "Something went wrong! Please check console"})      
    }
    


}
