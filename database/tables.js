import connect from './conn';

connect.query(
  `
CREATE TABLE IF NOT EXISTS locations (
   
id SERIAL,
 
 locationid VARCHAR (255) PRIMARY KEY,
    
 name VARCHAR (255) NOT NULL,
 
areacode VARCHAR (255) NOT NULL,
 
 male integer NOT NULL,
                     
female integer NOT NULL,
 
total integer NOT NULL,
 
parentid VARCHAR (255) NULL,
    
createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)   
`, (err, res) => {
  connect.end()
})
