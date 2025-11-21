import { RequestModel } from "../models/request.js";
import { ClearanceModel } from "../models/clearance.js";
import { createNotification } from "./notification.js";

// ---------------------------------
// STUDENT
// ---------------------------------

// new req
export async function createRequest(body) {
  try {
    if (!body.student_id || !body.documents || body.documents.length === 0 || !body.purpose || !body.contact_number || !body.last_sem_attended || !body.semester || body.total_amount == null) {
        throw new Error("Missing required fields.")
    }

    const request = new RequestModel(body);
    const saved = await request.save();
    return saved;   
  } catch (err) {
    console.error("Error creating request:", err)
    throw err;
  }
}

export async function viewRequest(req, res) { // working!
    try {
        const { id } = req.params

        const request = await RequestModel.findById(id)
            .populate("student_id")
        
        if (!request) {
            return res.status(404).json({
                success: false,
                message: "Request not found."
            })
        }

        return res.status(200).json({
            success: true,
            request
        })
    }

    catch (error) {
        console.error("Failed to fetch request: ", error)
        res.status(500).json({
            success: false,
            message: "Server error while fetching request."
        })
    }
}

export async function viewMyRequests(req, res) {
    try {
        const { studentId } = req.params;
        if (req.user.role === "Student" && studentId !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You can only view your own requests."
            });
        }

        const requests = await RequestModel.find({ student_id: studentId })
            .sort({ request_date: -1 });
        res.status(200).json({
            success: true,
            requests: requests || []
        });
    } catch (error) {
        console.error("Failed to fetch student's requests:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching requests."
        });
    }
}

export async function updateMyRequest(req, res) {
    try {
        const { id } = req.params

        const request = await RequestModel.findById(id);
        if (!request) {
            return res.status(404).json({
                success: false,
                message: "Request not found"
            })
        }

        if (request.student_id.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You can only update your own requests."
            })
        }

        if (request.status !== "PENDING (Clearance)" && request.status !== "PENDING (Payment)") {
            return res.status(400).json({
                success: false,
                message: "Cannot update request after payment. Please submit a new request."
            })
        }

        const { documents, purpose, contact_number, last_sem_attended, semester, total_amount } = req.body

        const updateData = {}

        if (documents !== undefined) updateData.documents = documents;
        if (purpose !== undefined) updateData.purpose = purpose;
        if (contact_number !== undefined) updateData.contact_number = contact_number;
        if (last_sem_attended !== undefined) updateData.last_sem_attended = last_sem_attended;
        if (semester !== undefined) updateData.semester = semester;
        if (total_amount !== undefined) updateData.total_amount = total_amount;

        const updatedRequest = await RequestModel.findByIdAndUpdate(id, updateData, { new: true })
        res.status(200).json({
            success: true,
            message: "Request updated successfully.",
            request: updatedRequest
        })
    } catch (error) {
        console.error("Failed to update request:", error)
        res.status(500).json({
            success: false,
            message: "Server error during update."
        })
    }
}

// ---------------------------------
// STAFF
// ---------------------------------


// get all reqs
export async function viewRequests(req, res) { // working!
    try {
        const requests = await RequestModel.find()
            .populate('student_id')
        
        res.status(200).json({ success: true, requests} ) 
    } catch (error) {
        res.status(500).json({
            message: 'Failed to catch all requests.',
            error: error.message
        })
    }
}

// update reqs (staff ONLY)
export async function updateRequest (req, res) { // working!
    try {
        const { id } = req.params

        const {
            status, 
            remarks,
            processing_time,
            release_date,
            proof_of_payment,
            payment_verified_by,

        } = req.body
        
        const updateData = {}

        if (status) updateData.status = status;
        if (remarks !== undefined) updateData.remarks = remarks;
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

        if (status === "PENDING (Clearance)") {
            createNotification(
                "Student",
                updatedRequest.student_id._id,
                "Your request is now pending. Please wait for clearance verification."
            )
        } else if (status === "PENDING (Payment)") {
            createNotification(
                "Student",
                updatedRequest.student_id._id,
                "Your request is now pending. Please wait for payment verification."
            )
        } else if (status === "PREPARING") {
            createNotification(
                "Student",
                updatedRequest.student_id._id,
                "Your request is now being processed. Please wait for a message when it is ready for pickup."
            )
        } else if (status === "FOR PICKUP") {
            createNotification(
                "Student",
                updatedRequest.student_id._id,
                "Your document/s is/are ready for pickup!"
            )
        } else if (status === "CLAIMED") {
            createNotification(
                "Student",
                updatedRequest.student_id._id,
                "You have successfully claimed your document/s."
            )
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

// ---------------------------------
// BOTH
// ---------------------------------

export async function deleteRequest(req, res) {
    try {
        const { id } = req.params;

        const request = await RequestModel.findById(id);
        if (!request) {
            return res.status(404).json({
                success: false,
                message: "Request not found."
            });
        }

        if (request.student_id.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You can only delete your own requests."
            })
        }

        await RequestModel.findByIdAndDelete(id)

        res.status(200).json({
            success: true,
            message: "Request deleted successfully."
        });

    } catch (error) {
        console.error("Failed to delete request:", error);
        res.status(500).json({
            success: false,
            message: "Server error during deletion."
        });
    }
}