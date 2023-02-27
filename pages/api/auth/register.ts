import conn from "../../../utils/db";


export default async function handler(req, res) {
    try {
        const { email, password,username } = req.body;

        const query = `Select * from public.users WHERE "email" = '${email}'`; 
        //console.log(query);
        const results = await conn.query(query);
        //console.log(results);
        if(results.rowCount==0){
            const query1=`insert into public."users"("email","name","password") values('${email}','${password}','${username}')`;
            //console.log(query1);
            const results2 = await conn.query(query1);
            return res.status(200).json({ message: "Registration Successful" });
        }
        else{
        return res.status(401).json({ message: "already registered" });
        }
        
      
        
    } catch (error) {
        console.log(error)
        res.status(404).json({message: "Something went wrong! Please check console"});
        
    }

}
