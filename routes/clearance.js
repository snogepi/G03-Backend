import express from 'express';

import { auth } from '../middleware/auth.js';
import { createClearance, verifyClearance } from '../controllers/clearance.js';

const router = express.Router()

router.post('/', auth, createClearance)

router.put('/verify/:id', auth, verifyClearance)

export { router as clearanceRoutes }