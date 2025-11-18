import express from 'express'
import { auth } from '../middleware/auth.js'
import { scanRFID } from '../controllers/rfid-log.js'
import { RFIDLogModel } from '../models/rfid-log.js'

const router = express.Router()

router.post('/scan', scanRFID)

router.get('/logs', auth, async (req, res) => {
    try {
        if (req.user.role !== "Staff") {
            return res.status(403).json({
                success: false,
                message: "Only staff can view RFID logs."
            })
        }

        const { action, rfid_tag, date } = req.query
        const filter = {}

        if (action) filter.action = action
        if (rfid_tag) filter.rfid_tag = rfid_tag

        if (date) {
            const start = new Date(date)
            const end = new Date(date)
            end.setDate(end.getDate() + 1)

            filter.timestamp = { $gte: start, $lt: end}
        }

        const logs = await RFIDLogModel.find(filter)
            .populate({
                path: "request_id",
                populate: [
                    { path: "student_id", select: "student_number" },
                    { path: "doc_type_id", select: "doc_name"}
                ]
            })
            .sort({ timestamp: -1 })
            .limit(50); 
        
        return res.status(200).json({
            success: true,
            logs
        })
    }

    catch (error) {
        console.error("Failed to fetch RFID logs:", error)

        return res.status(500).json({
            success: false,
            message: "Server error while fetching RFID logs"
        })
    }
})

export { router as rfidLogRoutes } 