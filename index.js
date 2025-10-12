import 'dotenv/config';
import express from 'express'
import mongoose from 'mongoose'
import { userRoutes } from './routes/user.js'

const app = express();

app.use(express.json());
app.use('/user', userRoutes)

mongoose.connect(process.env.MONGODB_URL)
mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'))

app.listen(3000, () => {
    console.log('Server running on port 3000')
})