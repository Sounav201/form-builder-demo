// import type { NextApiRequest, NextApiResponse } from 'next'
import { generateUUID } from '../../services/generateUUID';
import conn from '../../utils/db';


export default async function handler(req,res) 
{
    try {
      const {user,formID} = req.body;
      
      
      console.log('User : ', user)
      
     // var query = `INSERT INTO form (formID, formHeading, formAreaItems) VALUES ('${formID}', '${formHeading}', '${formAreaItems}')`
      //var query = `INSERT INTO public."Form" ("Formid","user_id","name","Form_data") VALUES('${formID}','${user}','${formHeading}', '${JSON.stringify(formAreaItems)}' )`;
      var query = `DELETE FROM public."Response" where "user_id" = '${user}' AND "Form_id" = '${formID}'`;
      const results = await conn.query(query);
      console.log('Successfully deleted from response table');
      query = `DELETE FROM public."Form" where "user_id" = '${user}' AND "Formid" = '${formID}'`
      console.log(query);
      
      const results2 = await conn.query(query);
    //  console.log('response fro DB ', results);
  
  
      res.status(200).json({ message: 'ok' })
        
    } catch (error) {
    console.log(error)
    res.status(404).json({message: "Something went wrong! Please check console"})      
    }

}