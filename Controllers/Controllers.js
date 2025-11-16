const Role_Services = require('../Services/Services')

class RoleController {

    async createRole(req, res) {

        try {

            const roleData = req.body;
            const newRole = await Role_Services.createRole(roleData);
            res.status(201).json({
                success: true,
                message: 'Role created successfully',
                role: newRole
            });

        }

        catch (error) {
            res.status(400).json({
                error: error.message,
                statusCode:400,
                message:"Error in creating Role",
            });
        }


    }

    async getAllRoles(req, res) {
        try {
            const roles = await Role_Services.getAllRoles();
            res.status(200).json({
                success: true,
                roles
            });
        } catch (error) {
            res.status(400).json({
                message: error.message
            });
        }
    }

    async getRoleById(req, res) {
        try {
            const role = await Role_Services.getRoleById(req.params.id);
            res.status(200).json({
                success: true,
                role
            });
        } catch (error) {
            res.status(404).json({
                message: error.message
            });
        }
    }

    async deleteRole(req, res) {
        try {
            const deleted = await Role_Services.deleteRole(req.params.id);
            res.status(200).json({
                success: true,
                message: "Role deleted successfully",
                role: deleted
            });
        } catch (error) {
            res.status(404).json({
                message: error.message
            });
        }
    }

    async updateRole(req, res) {
        try {
            const updatedRole = await Role_Services.updateRole(req.params.id, req.body);

            res.status(200).json({
                success: true,
                message: "Role updated successfully",
                role: updatedRole
            });

        } catch (error) {
            res.status(400).json({
                message: error.message
            });
        }
    }



}

module.exports = new RoleController();