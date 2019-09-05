import { Client } from 'pg';

require('dotenv').config();


const database = process.env.DATABASE_URL;

const connectString = database;
const clientString = new Client(connectString);

clientString.connect();

const dropTables = () => {
  const query = `
   
          DROP TABLE IF EXISTS locations CASCADE;

      `;

  clientString.query(query, (err) => {
    if (err) {
      return err.message;
    }
    clientString.end();
  });
};


dropTables();
