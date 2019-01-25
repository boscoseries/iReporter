import path from 'path';
import express from "express";
import incidents from './incidentRoute';
import users from './userRoute';

const router = express.Router();

// fetch homepage
router.get("/", (req, res) => {
	res.redirect('/docs.html')
});

router.get("/api/v1", (req, res) => {
	res.json('Welcome to iReporter API');
});

// use incidentRouter
router.use("/api/v1", incidents);
// use userRouter
router.use("/api/v1/auth", users);

router.all('*', (req, res) => {
	res.status(400).json({
		status: 400,
		error: 'Invalid path supplied'
	})
})

export default router;
