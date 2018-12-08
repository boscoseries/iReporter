import express from "express";
import redFlag from "../controllers/redFlag";

const router = express.Router();

// fetch all Red-flag records
router.get("/red-flags", redFlag.getredFlags);

// fetch a specific Red-flag records
router.get("/red-flags/:id", redFlag.getredFlag);

// Create a red flag record
router.post("/red-flags", redFlag.createdFlag);

// edit the location of a red flag record
router.patch("/red-flags/:id/location", redFlag.updateLocation);

// edit the comment of a red flag record
router.patch("/red-flags/:id/comment", redFlag.updateComment);

// delete a specific red-flag record
router.delete("/red-flags/:id", redFlag.deletedFlag);

export default router;