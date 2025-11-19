const UserMembershipService = require("../Services/Services");

const TRAINEE_API = "https://anubis-traineeprofile-services.onrender.com/api/v2/trainee_profile/";
const axios = require("axios");

class UserMembershipController {

    async create(req, res) {
        try {
            const membership = await UserMembershipService.create(req.body);
            res.status(201).json({ success: true, data: membership });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }

    async getAll(req, res) {
        const memberships = await UserMembershipService.getAll();
        res.json({ success: true, data: memberships });
    }

    async getById(req, res) {
        try {
            const membership = await UserMembershipService.getById(req.params.id);

            if (!membership)
                return res.status(404).json({ message: "Membership not found" });

            res.json({ success: true, data: membership });

        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async reduceSession(req, res) {
        try {
            const updated = await UserMembershipService.reduceSession(req.params.id);
            res.json({ success: true, data: updated });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async delete(req, res) {
        await UserMembershipService.delete(req.params.id);
        res.json({ success: true, message: "Membership deleted" });
    }

    async getByTrainee(req, res) {
        try {
            const traineeId = req.params.traineeId;

            // Check if trainee exists via external API
            let trainee;
            try {
                const response = await axios.get(`${TRAINEE_API}${traineeId}`);
                trainee = response.data?.data;
            } catch (err) {
                return res.status(404).json({ success: false, message: "Trainee not found" });
            }

            const memberships = await UserMembershipService.getByTraineeId(traineeId);

            if (!memberships || memberships.length === 0) {
                return res.status(404).json({ success: false, message: "No memberships found for this trainee" });
            }

            res.json({ success: true, data: memberships });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }
}

module.exports = new UserMembershipController();
