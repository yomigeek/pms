import connect from './conn';

connect.query(
  ` DROP TABLE IF EXISTS locations CASCADE;
  `, (err, res) => {
  connect.end()
})
