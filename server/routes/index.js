import express from "express";
import redFlags from './redFlag';

const router = express.Router();

// fetch homepage
router.get("/", (req, res) => {
	res
	.status(200)
	.json("Welcome to iReporter");
});

router.get("/api/v1", (req, res) => {
	res.json('Welcome to iReporter API');
});

router.use("/api/v1", redFlags);

export default router;
