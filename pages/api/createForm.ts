import type { NextApiRequest, NextApiResponse } from 'next'
import { generateUUID } from '../../services/generateUUID';
import conn from '../../utils/db';

type Data = {
  name: string
}

export default async function handler(req,res) 
{
    try {
      const {formHeading,formAreaItems,user,formID,formBackground} = req.body;
      
      
      console.log('User : ', user)
      console.log('Background : ', formBackground)
      
     // var query = `INSERT INTO form (formID, formHeading, formAreaItems) VALUES ('${formID}', '${formHeading}', '${formAreaItems}')`
      //var query = `INSERT INTO public."Form" ("Formid","user_id","name","Form_data") VALUES('${formID}','${user}','${formHeading}', '${JSON.stringify(formAreaItems)}' )`;
      var query = `DO $$
      BEGIN
      IF EXISTS(SELECT * FROM public."Form" where "Formid"='${formID}') then
      update public."Form" set "name" ='${formHeading}', "Form_data" = '${JSON.stringify(formAreaItems)}', "formBackground" ='${formBackground}' where  "Formid"='${formID}';
      else
      INSERT INTO public."Form" ("Formid","user_id","name","Form_data","formBackground") VALUES('${formID}','${user}','${formHeading}', '${JSON.stringify(formAreaItems)}','${formBackground}' );
      END IF;
      END $$;
      `
      //console.log(query);
      
      const results = await conn.query(query);
    //  console.log('response fro DB ', results);
  
  
      res.status(200).json({ message: 'ok' })
        
    } catch (error) {
    console.log(error)
    res.status(404).json({message: "Something went wrong! Please check console"})      
    }

}
