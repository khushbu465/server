const express = require("express");
const Duty = require("../models/Duty");
const router = express.Router();

router.post("/assign_duty", async (req, res) => {
    try {
        const { date, vehicleId, driverId, conductorId, startTime, duration } = req.body;

        // Check for duplicate duty
        const checkexiting_duty = await Duty.findOne({ date, vehicleId });
        if (checkexiting_duty) {
            return res.send({
                status: 0,
                message: "Vehicle already assigned",
                data: ''
            });
        }
        const driverConflict = await Duty.findOne({
            date,
            driverId,
            startTime
        });

        if (driverConflict) {
            return res.send({
                status: 0,
                message: "This driver is already assigned to another duty at the same time.",
                data: '',
            });
        }
        const conductorConflict = await Duty.findOne({
            date,
            conductorId,
            startTime
        });

        if (conductorConflict) {
            return res.send({
                status: 0,
                message: "This conductor is already assigned to another duty at the same time.",
                data: '',
            });
        }
        const dutyobj = new Duty({
            date,
            vehicleId,
            driverId,
            conductorId,
            startTime,
            duration
        });

        const saved_data = await dutyobj.save();
        if (!saved_data) {
            res.send({
                status: 0,
                message: 'Something went wrong!',
                data: '',
            })
        } else {
            res.send({
                status: 1,
                message: "Duty assigned successfully",
                data: saved_data,
            });
        }
    } catch (error) {
        res.send({
            status: 0,
            message: 'Something went wrong!',
            data: '',
        })
    }
});
// Fetch duties in a date range.    
router.get("/duties", async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return res.send({
                status: 0,
                message: "Start date and end date are required",
                data: ''
            });
        }

        const duties = await Duty.find({
            date: { $gte: new Date(startDate), $lte: new Date(endDate) }
        }).populate({
            path: 'vehicleId',
            select: "name"
        }).populate({
            path: 'driverId',
            select: "name"
        })
            .populate({
                path: 'conductorId',
                select: "name"
            });
        if (duties) {
            res.send({
                status: 1,
                message: 'Duty fetch successfully!',
                data: duties
            })
        } else {
            res.send({
                status: 0,
                message: 'Something went wrong!',
                data: '',
            })
        }
    } catch (err) {
        console.log(err)
    }
});
// Fetch all duties 
router.get("/getall", async (req, res) => {
    try {

        const duties = await Duty.find()
            .populate({
                path: 'vehicleId',
                select: "name"
            }).populate({
                path: 'driverId',
                select: "name"
            })
            .populate({
                path: 'conductorId',
                select: "name"
            });;
        if (duties) {
            res.send({
                status: 1,
                message: 'Duty fetch successfully!',
                data: duties
            })
        } else {
            res.send({
                status: 0,
                message: 'Something went wrong!',
                data: '',
            })
        }
    } catch (err) {
        console.log(err)
    }
});

module.exports = router;
