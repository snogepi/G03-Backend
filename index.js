import 'dotenv/config';
import express from 'express'
import mongoose from 'mongoose'
import helmet from 'helmet'
//import mongoSanitize from 'express-mongo-sanitize'
//import xss from 'xss-clean'

import { userRoutes } from './routes/user.js'
import { requestRoutes } from './routes/request.js'

const app = express()

app.use(helmet())
app.use(express.json())
//app.use(mongoSanitize())
//app.use(xss())
app.use('/user', userRoutes)
app.use('/requests', requestRoutes)

mongoose.connect(process.env.MONGODB_URL)
mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'))

app.listen(3000, () => {
    console.log('Server running on port 3000')
})