import express from 'express'
import { createRequest, getAllRequests } from '../controllers/request.js'

const router = express.Router();

router.post('/', createRequest)

router.get('/', getAllRequests)

export { router as requestRoutes }