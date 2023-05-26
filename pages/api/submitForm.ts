// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import conn from '../../utils/db';

type Data = {
  name: string
}

export default async function handler(req,res) 
{
    try {
      const {responseID, formID, user,responseData,created_at} = req.body;
      //Escape single quotes
      responseData.forEach((element,index) => {
        let answer = element.answer;
        element.answer = answer.replace(/'/g, "''");        
        let question = element.question;  
        element.question = question.replace(/'/g, "''");

      })

      console.log(responseData)
      var query = `Do $$
      Begin
      If not exists(select * from public."Response" where "Responseid"='${responseID}') then
      Insert into public."Response" ("Responseid","Form_id","Response_data","user_id","created_at") values('${responseID}','${formID}','${JSON.stringify(responseData)}','${user}','${created_at}');
      End if;
      End $$;` 


      console.log(query);
        
      const results = await conn.query(query);
    //  console.log('response fro DB ', results);
      
        
      res.status(200).json({ message: 'ok' })
    } catch (error) {
      console.log("Error: ",error)
      res.status(404).json({message: "Something went wrong! Please check console"})      
    }
    


}
