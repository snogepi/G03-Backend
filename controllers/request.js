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
export async function viewRequests(req, res) {
    try {
        const requests = await RequestModel.find()
            .populate('student_id')
            .populate('doc_type_id')
        
        res.status(200).json({ success: true, requests} ) 
    } catch (error) {
        res.status(500).json({
            message: 'Failed to catch all requests.',
            error: error.message
        })
    }
}

// update reqs (staff ONLY)
export async function updateRequest (req, res) {
    try {
        const { id } = req.params

        const {
            status, 
            processing_time,
            release_date,
            proof_of_payment,
            payment_verified_by,

        } = req.body
        
        const updateData = {}

        if (status) updateData.status = status;
        if (remarks) updateData.remarks = remarks;
        if (processing_time !== undefined) updateData.processing_time = processing_time;
        if (release_date !== undefined) updateData.release_date = release_date;
        if (proof_of_payment !== undefined) updateData.proof_of_payment = proof_of_payment;
        if (payment_verified_by !== undefined) updateData.payment_verified_by = payment_verified_by;

        const updatedRequest = await RequestModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        )
        .populate("student_id")
        .populate("doc_type_id");

        if (!updatedRequest) {
            return res.status(404).json({
                success: false,
                message: "Request not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Request updated successfully.",
            request: updatedRequest
        });
    } catch (error) {
        console.error("Failed to update request:", error);
        res.status(500).json({
            success: false,
            message: "Server error during update."
        });
    }
}