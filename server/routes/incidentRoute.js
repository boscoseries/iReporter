import express from 'express';
import  Incident, {getAllRedflags,getOneRedflag,create,updateRedflagLocation,
  updateRedflagComment,updateRedflagStatus,deleteRedflagRecord,getAllInterventions,
  getOneIntervention,updateInterventionLocation,updateInterventionComment,
  updateInterventionStatus,deleteInterventionRecord} from '../controllers/incidentController';
import checkField from '../middlewares/validation';
import auth, { authentication, adminAuthentication } from '../middlewares/auth'

const router = express.Router();

/*******************REDFLAG ENDPOINTS*******************/

router.get('/red-flags', authentication, adminAuthentication, getAllRedflags);
router.get('/red-flags/:id', authentication, adminAuthentication, getOneRedflag);
router.post('/red-flags', checkField,  authentication, create);
router.patch('/red-flags/:id/location', authentication, updateRedflagLocation);
router.patch('/red-flags/:id/comment', authentication, updateRedflagComment);
router.patch('/red-flags/:id/status', adminAuthentication, updateRedflagStatus);
router.delete('/red-flags/:id', authentication, deleteRedflagRecord);


/*******************INTERVENTION ENDPOINTS*******************/

router.get('/interventions', authentication, adminAuthentication, getAllInterventions);
router.get('/interventions/:id', authentication, getOneIntervention);
router.post('/interventions', checkField, authentication, create);
router.patch('/interventions/:id/location', authentication, updateInterventionLocation);
router.patch('/interventions/:id/comment', authentication, updateInterventionComment);
router.patch('/interventions/:id/status', adminAuthentication, updateInterventionStatus);
router.delete('/interventions/:id', authentication, deleteInterventionRecord);

export default router;