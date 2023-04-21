import conn from "../../utils/db";


export default async function handler(req, res) {
    const {formID} = req.body;
    try {
        
        const query = `Select "Response_data" from public."Response" WHERE "Form_id" = '${formID}'`; 
        console.log(query);
        const results = await conn.query(query);
        console.log(results);
        
    } catch (error) {
        console.log(error)
        res.status(404).json({message: "Something went wrong! Please check console"});
        
    }

}