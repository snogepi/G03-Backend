import express from 'express'

import { sendNotification, viewNotification } from '../controllers/notification.js'
import { auth } from '../middleware/auth.js'

const router = express.Router()

router.post('/send', auth, sendNotification)

router.get('/view', auth, viewNotification)

export { router as notificationRoutes }