import express from 'express';
import * as Incident from '../controllers/incidentController';
import checkField from '../middlewares/validation';
import * as auth from '../middlewares/auth';

const router = express.Router();

/*******************REDFLAG ENDPOINTS*******************/

router.get('/red-flags', Incident.getAllRedflags); // auth.adminAuthentication,
router.get('/red-flags/:id', Incident.getOneRedflag); //auth.authentication, 
router.post('/red-flags', Incident.create); //checkField,  auth.authentication, 
router.patch('/red-flags/:id/location', Incident.updateRedflagLocation); // auth.authentication,
router.patch('/red-flags/:id/comment', Incident.updateRedflagComment); //auth.authentication, 
router.patch('/red-flags/:id/status', Incident.updateRedflagStatus); //auth.adminAuthentication, 
router.delete('/red-flags/:id', Incident.deleteRedflagRecord); //auth.authentication, 


/*******************INTERVENTION ENDPOINTS*******************/

router.get('/interventions', Incident.getAllInterventions); //, auth.adminAuthentication, 
router.get('/interventions/:id', Incident.getOneIntervention);//auth.authentication, 
router.post('/interventions', Incident.create); //checkField,  auth.authentication, 
router.patch('/interventions/:id/location', Incident.updateInterventionLocation); //auth.authentication, 
router.patch('/interventions/:id/comment', Incident.updateInterventionComment); //auth.authentication, 
router.patch('/interventions/:id/status', Incident.updateInterventionStatus);//auth.adminAuthentication, 
router.delete('/interventions/:id', Incident.deleteInterventionRecord); //auth.authentication, 

export default router;