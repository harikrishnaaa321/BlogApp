import express from 'express';
const router = express.Router();
import { google, signup, signin } from '../controllers/auth.controller.js';

router.post('/google', google);
router.post('/signup', signup);
router.post('/signin', signin);

export default router;
