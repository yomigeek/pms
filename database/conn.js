import { Pool } from 'pg';
import dotenv from 'dotenv';


dotenv.config();

let mydatabase;

if (process.env.NODE_ENV == 'test') {
  
  mydatabase = process.env.TEST_DATABASE_URL;
}
else  {
  mydatabase = process.env.DATABASE_URL;
}


const connect = new Pool({ connectionString: mydatabase, ssl: true });

export default connect;
