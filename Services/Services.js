const Specialization_Schema = require('../Models/Model')
const mongoose = require("mongoose");

class SpecializationService {

    async createSpecialization(SpecializationData) {
        try {

            const {name,description,imageUrl}= SpecializationData

            // Check if Role exists
            const existSpecialization = await Specialization_Schema.findOne({ name });

            if(existSpecialization) {
                throw new Error("Specialization already exist!");
            }

            // Creation Role Process
            const newSpecialization = await Specialization_Schema.create({
                name:name,
                description:description,
                imageUrl:imageUrl,
            })

            return newSpecialization;




        }catch (error) {
            throw new Error(error);
        }
    }


    async getAllSpecializations() {
        try {
            return await Specialization_Schema.find();
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getSpecializationById(SpecializationId) {
        try {
            const Specialization = await Specialization_Schema.findById(SpecializationId);
            if (!Specialization) throw new Error("Role not found");
            return Specialization;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteSpecialization(SpecializationId) {
        try {
            const deleted = await Specialization_Schema.findByIdAndDelete(SpecializationId);
            if (!deleted) throw new Error("Role not found");
            return deleted;
        } catch (error) {
            throw new Error(error.message);
        }
    }


    async updateSpecialization(SpecializationId, updatedData) {
        try {
            const Specialization = await Specialization_Schema.findById(SpecializationId);
            if (!Specialization) throw new Error("Specialization not found");

            // Update allowed fields
            Specialization.name = updatedData.name || Specialization.name;
            Specialization.description = updatedData.description || Specialization.description;
            Specialization.imageUrl = updatedData.imageUrl || Specialization.imageUrl;

            const updatedSpecialization = await Specialization.save();
            return updatedSpecialization;

        } catch (error) {
            throw new Error(error.message);
        }
    }

}

module.exports = new SpecializationService;