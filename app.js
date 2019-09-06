import 'babel-core/register';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import apiRoutes from './routes/index';
import dotenv from 'dotenv';

dotenv.config();

// Setting up the express app
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

// Ensures incoming data are parsed
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Application routes
app.use('/api/v1/', apiRoutes);

// catch un-available routes
app.all('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    statusCode: 404,
    message: 'Oops! The resource you requested does not exist.',
  });
});

app.listen(port, () => { console.log(`server started at: ${port}`); });

export default app;
