import conn from '../../utils/db';

export default async function handler(req,res) 
{
    try {
      const {formID} = req.body;
      console.log('formID : ', formID)
      
     // var query = `INSERT INTO form (formID, formHeading, formAreaItems) VALUES ('${formID}', '${formHeading}', '${formAreaItems}')`
      var query = `SELECT * from public."Form" WHERE "Formid" = '${formID}'`;
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
