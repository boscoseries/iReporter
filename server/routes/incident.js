import express from "express";
import incident from '../controllers/incident';

const router = express.Router();

// fetch all Red-flag records
router.get("/red-flags", incident.getIncidents);

// fetch a specific Red-flag records
router.get("/red-flags/:id", incident.getIncident);

// Create a red flag record
router.post("/red-flags", incident.createIncident);

// edit the location of a red flag record
router.patch("/red-flags/:id/location", incident.updateLocation);

// edit the comment of a red flag record
router.patch("/red-flags/:id/comment", incident.updateComment);

// delete a specific red-flag record
router.delete("/red-flags/:id", incident.deleteIncident);

export default router;
