import { Client } from 'pg';

require('dotenv').config();

const database = process.env.DATABASE_URL;

const connectString = database;

const clientString = new Client(connectString);

clientString.connect();

const createTable = () => {
  const query = `
                
          CREATE TABLE IF NOT EXISTS locations (
   
              id SERIAL,

              locationid VARCHAR (255) PRIMARY KEY,
   
              name VARCHAR (255) NOT NULL,

              areacode VARCHAR (255) NOT NULL,

              totalmale VARCHAR (255) NOT NULL,
                    
              totalfemale VARCHAR (255) NOT NULL,

              parentlocationid VARCHAR (255) NULL,
   
              createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
   
          );

      `;

  clientString.query(query, (err) => {
    if (err) {
      return err.message;
    }
    clientString.end();

  });
};


createTable();
