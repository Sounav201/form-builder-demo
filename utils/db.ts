import {Pool , Client} from  "pg";


const connectionString = 'postgresql://postgres:FormBuilder@2022@db.mbbvfsnnnvflmlpplvhn.supabase.co:5432/postgres';

const pool = new Pool({
    connectionString
})



let conn = new Pool({
    connectionString
})

export default conn;
