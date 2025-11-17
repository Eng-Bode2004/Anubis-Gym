const Trainer_Profile_Model = require('../Models/TrainerProfile_Model');
const Specialization_Model = require('../Models/Specialization_Model');

class Trainer_Profile_Services {

    async createTrainerProfile(data) {
        try {
            const { name, specialization, experience_years, profile_image } = data;
            const { first_name, middle_name, last_name } = name

            const newTrainer = new Trainer_Profile_Model({
                name: {
                    first_name: first_name.trim(),
                    middle_name: middle_name?.trim() || null,
                    last_name: last_name.trim()
                },
                specialization,
                experience_years,
                profile_image
            });

            await newTrainer.save();
            return newTrainer;

        } catch (err) {
            throw new Error(err.message);
        }
    }

    async getTrainerProfile(id) {
        const trainer = await Trainer_Profile_Model.findById(id)

        if (!trainer) throw new Error("Trainer not found");
        return trainer;
    }

    async getAllTrainers() {
        return await Trainer_Profile_Model.find()
    }

    async updateTrainerName(id, nameData) {
        const { first_name, middle_name, last_name } = nameData;

        const updated = await Trainer_Profile_Model.findByIdAndUpdate(
            id,
            {
                $set: {
                    "name.first_name": first_name.trim(),
                    "name.middle_name": middle_name?.trim() || null,
                    "name.last_name": last_name.trim()
                }
            },
            { new: true }
        );

        if (!updated) throw new Error("Trainer not found");
        return updated;
    }

    async updateFullTrainerProfile(trainerId, data) {
        try {
            const {
                specialization,
                experience_years,
                profile_image,
            } = data;

            // Check trainer exists
            const trainer = await Trainer_Profile_Model.findById(trainerId);
            if (!trainer) throw new Error("Trainer not found");

            const updateData = {};

            const updatedTrainer = await Trainer_Profile_Model.findByIdAndUpdate(
                trainerId,
                { $set: updateData },
                { new: true }
            );

            return updatedTrainer;

        } catch (err) {
            throw new Error(err.message);
        }
    }


}

module.exports = new Trainer_Profile_Services();
