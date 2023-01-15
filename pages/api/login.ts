import conn from "../../utils/db";
import { serialize } from 'cookie';
import * as jose from 'jose';


const secret = "Sounav201";

export default async function handler(req, res) {
    try {
        const { email, password } = req.body;
        const query = `Select * from public.users WHERE "email" = '${email}' AND "password"='${password}' `; 
        const results = await conn.query(query);
        
        if (results.rowCount > 0) {
            
            const jwtToken = await new jose.SignJWT({ email: email })
                .setProtectedHeader({ alg: 'HS256' })
                .setIssuedAt()
                .setExpirationTime('1d')
                .sign(new TextEncoder().encode(`${secret}`));
            const serialized = serialize("FormBuilder", jwtToken, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 1,//1 day
                path: "/"
            });
            res.setHeader('Set-Cookie', serialized);
            return res.status(200).json({ message: "Login Successful", token: jwtToken , email:email });
        }
        else {
            return res.status(401).json({ message: "Invalid credentials" });
        }
      
        
    } catch (error) {
        console.log(error)
        res.status(404).json({message: "Something went wrong! Please check console"});
        
    }

}
