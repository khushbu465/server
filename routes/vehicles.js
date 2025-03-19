const express = require("express");
const Vehicle = require("../models/Vehicle");
const router = express.Router();

router.post("/insert_vehicle", async (req, res) => {
    try {
        const { name } = req.body;
        const check_vehicle = await Vehicle.findOne({ name });

        if (check_vehicle) {
            return res.send({
                status: 0,
                message: "Vehicle already exists!",
                data: '',
            });
        }
        const vehicle_obj = new Vehicle({
            name,
        });

        const saved_data = await vehicle_obj.save();
        if (!saved_data) {
            res.send({
                status: 0,
                message: 'Something went wrong!',
                data: '',
            })
        } else {
            res.send({
                status: 1,
                message: "vehicle added successfully",
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
router.get("/vehicles", async (req, res) => {
    try {

        const get_data = await Vehicle.find();
        if (get_data) {
            res.send({
                status: 1,
                message: 'Vehicle data fetched successfully!',
                data: get_data
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
