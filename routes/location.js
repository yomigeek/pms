import { Router } from 'express';
import CheckConflicts from '../middlewares/CheckConflicts';
import LocationController from '../controllers/LocationController';
import LocationValidation from '../middlewares/validations/LocationValidation';

const locationRouter = Router();

locationRouter.post(
  '/add',
  LocationValidation.addLocation,
  CheckConflicts.existingLocation,
  CheckConflicts.checkParentId,
  LocationController.addLocation
);


export default locationRouter;
