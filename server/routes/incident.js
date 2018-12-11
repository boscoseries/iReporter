import express from "express";
import Incident from "../controllers/incidentController";
import checkField from "../helpers/middlewares";

const router = express.Router();

/*******************REDFLAG ENDPOINTS*******************/

// fetch all Red-flag records
// router.get("/red-flags", Incident.getAll);

// // fetch a specific Red-flag records
// router.get("/red-flags/:id", Incident.getOne);

// Create a red flag record
router.post("/red-flags", checkField, Incident.create);

// edit the location of a red flag record
// router.patch("/red-flags/:id/location", checkField, Incident.update);

// // edit the comment of a red flag record
// router.patch("/red-flags/:id/comment", checkField, Incident.update);

// // delete a specific red-flag record
// router.delete("/red-flags/:id", Incident.delete);


/*******************INTERVENTION ENDPOINTS*******************/

// fetch all Interventions records
// router.get("/interventions", Incident.getAll);

// // fetch a specific Intervention records
// router.get("/interventions/:id", Incident.getOne);

// Create an intervention records
router.post("/interventions", checkField, Incident.create);

// edit the location of a red flag record
// router.patch("/interventions/:id/location", checkField, Incident.update);

// // edit the comment of a red flag record
// router.patch("/interventions/:id/comment", checkField, Incident.update);

// // delete a specific red-flag record
// router.delete("/interventions/:id", Incident.delete);

export default router;