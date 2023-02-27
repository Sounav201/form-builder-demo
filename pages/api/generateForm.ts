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
      var query = `DO $$
      BEGIN
      IF EXISTS(SELECT * FROM public."Form" where "Formid"='${formID}') then
      update public."Form" set "name" ='${formHeading}' ,"Form_data"=  '${JSON.stringify(formData)}'where  "Formid"='${formID}';
      else
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
