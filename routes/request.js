import express from 'express'
import { auth } from '../middleware/auth.js' 

import { createRequest, viewRequest, viewRequests, updateRequest, deleteRequest } from '../controllers/request.js'

const router = express.Router();

// ---------------------------------
// STUDENT
// ---------------------------------

router.post('/createrequest', auth, async(req, res) => { // working!
    const isAdded = await createRequest(req.body)
    res.json({ isAdded })
})

router.get('/viewrequest/:id', auth, viewRequest)

// ---------------------------------
// STAFF
// ---------------------------------

router.get('/viewrequests', auth, viewRequests) // working!

router.put('/updaterequest/:id', auth, updateRequest) // working!

router.delete('/deleterequest/:id', auth, deleteRequest) // working!

// router.put('/exportrequests', exportRequests)

export { router as requestRoutes }