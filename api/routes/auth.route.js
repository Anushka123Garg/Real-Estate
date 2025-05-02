import express from 'express';
import { signup, signin, google, signOut, getMe } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/me", getMe);
router.post("/google", google);
router.get('/signout', signOut);

export default router;