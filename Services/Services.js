const TrainerProfile_Schema = require('../Models/Model');

class Trainer_Profile_Services {

    async createTrainerProfile(data) {
        try {
            const { name, specialization, experience_years } = data;
            const { first_name, middle_name, last_name } = name;

            const newTrainer = new TrainerProfile_Schema({
                name: {
                    first_name: first_name.trim(),
                    middle_name: middle_name ? middle_name.trim() : undefined,
                    last_name: last_name.trim()
                },
                specialization,
                experience_years
            });

            await newTrainer.save();
            return newTrainer;

        } catch (err) {
            throw new Error(err.message);
        }
    }

    async getTrainerProfile(id) {
        try {
            const trainer = await TrainerProfile_Schema.findById(id)
                .populate("specialization", "name description")
                .populate("trainees", "name age gender");

            if (!trainer) throw new Error("Trainer profile not found");

            return trainer;

        } catch (err) {
            throw new Error(err.message);
        }
    }

    async getAllTrainers() {
        try {
            return await TrainerProfile_Schema.find()
                .populate("specialization", "name description");
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async updateTrainerName(id, nameData) {
        try {
            const { first_name, middle_name, last_name } = nameData;

            const updated = await TrainerProfile_Schema.findByIdAndUpdate(
                id,
                {
                    $set: {
                        "name.first_name": first_name.trim(),
                        "name.middle_name": middle_name ? middle_name.trim() : undefined,
                        "name.last_name": last_name.trim()
                    }
                },
                { new: true }
            );

            if (!updated) throw new Error("Trainer not found");
            return updated;

        } catch (err) {
            throw new Error(err.message);
        }
    }
}

module.exports = new Trainer_Profile_Services();
