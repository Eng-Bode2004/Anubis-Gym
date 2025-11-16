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


}

module.exports = new RoleController();