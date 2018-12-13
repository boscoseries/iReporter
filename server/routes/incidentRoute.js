import express from 'express';
import * as Incident from '../controllers/incidentController';
import checkField from '../middlewares/validation';

const router = express.Router();

/*******************REDFLAG ENDPOINTS*******************/

// fetch all Red-flag records
router.get('/red-flags', Incident.getAllRedflags);

// fetch a specific Red-flag records
router.get('/red-flags/:id', Incident.getOneRedflag);

// Create a red flag record
router.post('/red-flags', Incident.create);

// update the location of a red flag record
router.patch('/red-flags/:id/location', checkField, Incident.updateRedflagLocation);

// update the comment of a red flag record
//router.patch('/red-flags/:id/comment', checkField, Incident.updateRedflagComment);

// update the status of a red flag record
//router.patch('/red-flags/:id/status', checkField, Incident.updateRedflagStatus);

// delete a specific red-flag record
//router.delete('/red-flags/:id', Incident.deleteRedflagRecord);


/*******************INTERVENTION ENDPOINTS*******************/

// fetch all Interventions records
router.get('/interventions', Incident.getAllInterventions);

// fetch a specific Intervention records
router.get('/interventions/:id', Incident.getOneIntervention);

// Create an intervention records
router.post('/interventions', Incident.create);

// update the location of a specific interventions record
router.patch('/interventions/:id/location', checkField, Incident.updateInterventionLocation);

// update the comment of specific interventions record
//router.patch('/interventions/:id/comment', checkField, Incident.updateInterventionComment);

// update the status of specific interventions record
//router.patch('/interventions/:id/status', checkField, Incident.updateInterventionStatus);

// delete a specific interventions record
//router.delete('/interventions/:id', Incident.deleteInterventionRecord);

export default router;