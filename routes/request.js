import express from 'express'
import { createRequest, viewRequests, updateRequest } from '../controllers/request.js'

const router = express.Router();

//router.post('/', createRequest)

router.post('/createrequest', async(req, res) => {
    const isAdded = await createRequest(req.body)
    res.json({ isAdded })
})

router.get('/viewrequests', viewRequests)

router.put('/:id/staff', updateRequest)

export { router as requestRoutes }