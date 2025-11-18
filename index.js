import 'dotenv/config';
import express from 'express'
import mongoose from 'mongoose'
import helmet from 'helmet'

import { userRoutes } from './routes/user.js'
import { requestRoutes } from './routes/request.js'
import { notificationRoutes } from './routes/notification.js'
import { clearanceRoutes } from './routes/clearance.js';
import { rfidLogRoutes } from './routes/rfid-log.js';

const app = express()

app.use(helmet())
app.use(express.json())
app.use('/user', userRoutes)
app.use('/requests', requestRoutes)
app.use('/notifications', notificationRoutes)
app.use('/clearance', clearanceRoutes)
app.use('/log', rfidLogRoutes)

mongoose.connect(process.env.MONGODB_URL)
mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'))

app.listen(3000, () => {
    console.log('Server running on port 3000')
})