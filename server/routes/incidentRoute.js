import express from 'express';
import * as Incident from '../controllers/incidentController';
import checkField from '../middlewares/validation';
import * as auth from '../middlewares/auth';

const router = express.Router();

/*******************REDFLAG ENDPOINTS*******************/

router.get('/red-flags', auth.authentication, Incident.getAllRedflags);
router.get('/red-flags/:id', auth.authentication, Incident.getOneRedflag);
router.post('/red-flags', auth.authentication, Incident.create);
router.patch('/red-flags/:id/location', auth.authentication, checkField, Incident.updateRedflagLocation);
router.patch('/red-flags/:id/comment', auth.authentication, checkField, Incident.updateRedflagComment);
router.patch('/red-flags/:id/status', checkField, auth.authentication, Incident.updateRedflagStatus);
router.delete('/red-flags/:id', auth.authentication, Incident.deleteRedflagRecord);


/*******************INTERVENTION ENDPOINTS*******************/

router.get('/interventions', auth.authentication, Incident.getAllInterventions);
router.get('/interventions/:id', auth.authentication, Incident.getOneIntervention);
router.post('/interventions', auth.authentication, Incident.create);
router.patch('/interventions/:id/location', auth.authentication, checkField, Incident.updateInterventionLocation);
router.patch('/interventions/:id/comment', auth.authentication, checkField, Incident.updateInterventionComment);
router.patch('/interventions/:id/status', auth.authentication, checkField, Incident.updateInterventionStatus);
router.delete('/interventions/:id', auth.authentication, Incident.deleteInterventionRecord);

export default router;