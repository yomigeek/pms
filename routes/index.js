import { Router } from 'express';
import locationRouter from './location';

const apiRoutes = Router();

// API Routes
apiRoutes.use('/location', locationRouter);

// Matches /api the API home route
apiRoutes.get('/', (req, res) => {
  res.status(200).send({
    url: `${req.protocol}://${req.headers.host}`,
    status: 'success',
    statusCode: 200,
    message: "PMS API"
  });
});

export default apiRoutes;
