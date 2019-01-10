import express from 'express';
import * as Incident from '../controllers/incidentController';
import checkField from '../middlewares/validation';
import * as auth from '../middlewares/auth';

const router = express.Router();

/*******************REDFLAG ENDPOINTS*******************/

router.get('/red-flags', auth.adminAuthentication, Incident.getAllRedflags); // 
router.get('/red-flags/:id', auth.authentication, Incident.getOneRedflag); // 
router.post('/red-flags', auth.authentication, Incident.create); // checkField, 
router.patch('/red-flags/:id/location', auth.authentication, Incident.updateRedflagLocation); //checkField, 
router.patch('/red-flags/:id/comment', auth.authentication, Incident.updateRedflagComment); // checkField
router.patch('/red-flags/:id/status', auth.adminAuthentication, Incident.updateRedflagStatus); // checkField
router.delete('/red-flags/:id', auth.authentication, Incident.deleteRedflagRecord); //


/*******************INTERVENTION ENDPOINTS*******************/

router.get('/interventions', auth.adminAuthentication, Incident.getAllInterventions); //
router.get('/interventions/:id', auth.authentication, Incident.getOneIntervention); // 
router.post('/interventions', auth.authentication, Incident.create); // checkField, 
router.patch('/interventions/:id/location', auth.authentication, Incident.updateInterventionLocation); //, checkField, 
router.patch('/interventions/:id/comment', auth.authentication, Incident.updateInterventionComment); //checkField, 
router.patch('/interventions/:id/status', auth.adminAuthentication, Incident.updateInterventionStatus); // checkField,
router.delete('/interventions/:id', auth.authentication, Incident.deleteInterventionRecord); // 

export default router;