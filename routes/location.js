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

locationRouter.get(
  '/all',
  LocationController.getAll
);

locationRouter.get(
  '/:pid',
  CheckConflicts.checkParentId,
  LocationController.getById
);

locationRouter.put(
  '/:aid',
  LocationValidation.addLocation,
  CheckConflicts.checkAreaCode,
  CheckConflicts.checkParentId,
  LocationController.update
);

locationRouter.get(
  '/single/:aid',
  CheckConflicts.checkAreaCode,
  LocationController.getSingle
);

locationRouter.delete(
  '/:aid',
  CheckConflicts.checkAreaCode,
  CheckConflicts.checkExistingSubLocations,
  LocationController.delete
);

export default locationRouter;
