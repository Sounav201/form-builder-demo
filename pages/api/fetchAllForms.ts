import conn from '../../utils/db';

export default async function handler(req,res) 
{
    try {
      
     // var query = `INSERT INTO form (formID, formHeading, formAreaItems) VALUES ('${formID}', '${formHeading}', '${formAreaItems}')`
      var query = `SELECT * from public."Form"`;
      //console.log(query);
      console.log('Running fetch all forms query')
      const results = await conn.query(query);
    //  console.log('response fro DB ', results);
      console.log('Query ran')
    if(results.rowCount>0)
    { console.log('All forms fetched from DB! ')
        res.status(200).json({ message: 'ok', data: results.rows })
      
    }
    else{
        console.log('No forms found in DB! ')
        res.status(200).json({ message: 'ok', data: [] })
    }
  
        
    } catch (error) {
    console.log("Error: ",error)
    res.status(404).json({message: "Something went wrong! Please check console",data:[]})      
    }

}
