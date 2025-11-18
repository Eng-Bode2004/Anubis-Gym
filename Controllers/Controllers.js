const SpecializationService = require('../Services/Services');

class SpecializationController {

    async create(req, res) {
        try {
            const specialization = await SpecializationService.createSpecialization(req.body);

            res.status(201).json({
                success: true,
                message: "Specialization created successfully",
                specialization:specialization,
            });

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async getAll(req, res) {
        try {
            const specializations = await SpecializationService.getAllSpecializations();

            res.status(200).json({
                success: true,
                specializations,
            });

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async getById(req, res) {
        try {
            const specialization = await SpecializationService.getSpecializationById(req.params.id);

            res.status(200).json({
                success: true,
                specialization,
            });

        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message,
            });
        }
    }

    async update(req, res) {
        try {
            const updated = await SpecializationService.updateSpecialization(
                req.params.id,
                req.body
            );

            res.status(200).json({
                success: true,
                message: "Specialization updated successfully",
                specialization: updated,
            });

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async delete(req, res) {
        try {
            const deleted = await SpecializationService.deleteSpecialization(req.params.id);

            res.status(200).json({
                success: true,
                message: "Specialization deleted successfully",
                specialization: deleted,
            });

        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message,
            });
        }
    }
}

module.exports = new SpecializationController();
