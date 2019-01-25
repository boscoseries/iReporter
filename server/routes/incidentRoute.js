import express from 'express';
import  Incident, {getAllRedflags,getOneRedflag,create,updateRedflagLocation,
  updateRedflagComment,updateRedflagStatus,deleteRedflagRecord,getAllInterventions,
  getOneIntervention,updateInterventionLocation,updateInterventionComment,
  updateInterventionStatus,deleteInterventionRecord} from '../controllers/incidentController';
import checkField from '../middlewares/validation';
import auth, { authentication, adminAuthentication } from '../middlewares/auth'

const router = express.Router();

/*******************REDFLAG ENDPOINTS*******************/

router.get('/red-flags', getAllRedflags); // 
router.get('/red-flags/:id', authentication, getOneRedflag); // authentication, adminAuthentication, 
router.post('/red-flags', create); //checkField,  authentication, 
router.patch('/red-flags/:id/location', updateRedflagLocation); // authentication, 
router.patch('/red-flags/:id/comment', updateRedflagComment); //authentication, 
router.patch('/red-flags/:id/status', updateRedflagStatus); //authentication, adminAuthentication, 
router.delete('/red-flags/:id', deleteRedflagRecord); //authentication, 


/*******************INTERVENTION ENDPOINTS*******************/

router.get('/interventions', authentication, adminAuthentication, getAllInterventions); //, 
router.get('/interventions/:id', authentication, getOneIntervention);//
router.post('/interventions',  authentication, create); //, checkField,
router.patch('/interventions/:id/location', authentication, updateInterventionLocation); //
router.patch('/interventions/:id/comment', authentication, updateInterventionComment); //
router.patch('/interventions/:id/status', authentication, adminAuthentication, updateInterventionStatus);//
router.delete('/interventions/:id', authentication, deleteInterventionRecord); //

export default router;