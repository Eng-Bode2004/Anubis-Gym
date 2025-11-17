const Trainer_Profile_Services = require('../Services/Services');

class Trainer_Profile_Controllers {

    async createTrainerProfile(req, res) {
        try {
            const data = req.body;
            const trainer = await Trainer_Profile_Services.createTrainerProfile(data);

            res.status(201).json({
                success: true,
                message: "Trainer profile created successfully",
                data: trainer
            });

        } catch (err) {
            res.status(500).json({
                success: false,
                error: err.message
            });
        }
    }

    async getTrainerProfile(req, res) {
        try {
            const { trainer_id } = req.params;

            const trainer = await Trainer_Profile_Services.getTrainerProfile(trainer_id);

            res.status(200).json({
                success: true,
                data: trainer
            });

        } catch (err) {
            res.status(500).json({
                success: false,
                error: err.message
            });
        }
    }

    async getAllTrainers(req, res) {
        try {
            const trainers = await Trainer_Profile_Services.getAllTrainers();

            res.status(200).json({
                success: true,
                data: trainers
            });

        } catch (err) {
            res.status(500).json({
                success: false,
                error: err.message
            });
        }
    }

    async updateTrainerName(req, res) {
        try {
            const { trainer_id } = req.params;
            const { name } = req.body;

            const updated = await Trainer_Profile_Services.updateTrainerName(trainer_id, name);

            res.status(200).json({
                success: true,
                data: updated
            });

        } catch (err) {
            res.status(500).json({
                success: false,
                error: err.message
            });
        }
    }

    async updateFullTrainerProfile(req, res) {
        try {
            const { trainer_id } = req.params;
            const data = req.body;

            const updatedTrainer = await Trainer_Profile_Services.updateFullTrainerProfile(
                trainer_id,
                data
            );

            res.status(200).json({
                success: true,
                message: "Trainer profile updated successfully",
                data: updatedTrainer
            });

        } catch (err) {
            res.status(400).json({
                success: false,
                error: err.message
            });
        }
    }

}

module.exports = new Trainer_Profile_Controllers();
