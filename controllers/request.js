import { RequestModel } from "../models/request.js";

// new req
export async function createRequest(body) {
    const { student_id, doc_type_id, purpose, request_date } = body

    try {
        const newRequest = new RequestModel({
            student_id: body.student_id,
            doc_type_id: body.doc_type_id,
            purpose: body.purpose,
            request_date: body.request_date
        })

        await newRequest.save()

        return {
            success: true,
            message: 'Request submitted successfully. Please wait for more updates.',
            request: newRequest
        }
    } catch (error) {
        console.error('Failed to create request.', error)
        return {
            success: false, 
            message: 'Server error during request submission. Please try again later.' 
        }
    }
}

// get all reqs
export async function getAllRequests(body) {
    try {
        const requests = await RequestModel.find()
            .populate('student_id')
            .populate('doc_type_id')
        
        res.status(200).json(requests) 
    } catch (error) {
        res.status(500).json({
            message: 'Failed to catch all requests.',
            error: error.message
        })
    }
}