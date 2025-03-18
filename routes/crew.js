const express = require("express");
const Crew = require("../models/Crew");
const router = express.Router();

router.post("/insert_crew", async (req, res) => {
    try {
        const { name, role } = req.body;

        const crew_obj = new Crew({
            name,
            role,
        });

        const saved_data = await crew_obj.save();
        if (!saved_data) {
            res.send({
                status: 0,
                message: 'Something went wrong!',
                data: '',
            })
        } else {
            res.send({
                status: 1,
                message: "Crew member added successfully",
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
router.get("/crew", async (req, res) => {
    try {

        const get_data = await Crew.find();
        if (get_data) {
            res.send({
                status: 1,
                message: 'Crew data fetched successfully!',
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
router.get("/get_drivers", async (req, res) => {
    try {
        const get_data = await Crew.find({ role: 'Driver' });
        if (get_data) {
            res.send({
                status: 1,
                message: 'Drivers data fetched successfully!',
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
router.get("/get_conductor", async (req, res) => {
    try {
        const get_data = await Crew.find({ role: 'Conductor' });
        if (get_data) {
            res.send({
                status: 1,
                message: 'Conductors data fetched successfully!',
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
