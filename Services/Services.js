const Role_Schema = require('../Models/Model')
const mongoose = require("mongoose");

class RoleService {

    async createRole(roleData) {
        try {

            const {name,description,imageUrl}= roleData

            // Check if Role exists
            const existRole = await Role_Schema.findOne({ name });

            if(existRole) {
                throw new Error("Role already exist!");
            }

            // Creation Role Process
            const newRole = await Role_Schema.create({
                name:name,
                description:description,
                imageUrl:imageUrl,
            })

            return newRole;




        }catch (error) {
            throw new Error(error);
        }
    }


    async getAllRoles() {
        try {
            return await Role_Schema.find();
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getRoleById(roleId) {
        try {
            const role = await Role_Schema.findById(roleId);
            if (!role) throw new Error("Role not found");
            return role;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteRole(roleId) {
        try {
            const deleted = await Role_Schema.findByIdAndDelete(roleId);
            if (!deleted) throw new Error("Role not found");
            return deleted;
        } catch (error) {
            throw new Error(error.message);
        }
    }


    async updateRole(roleId, updatedData) {
        try {
            const role = await Role_Schema.findById(roleId);
            if (!role) throw new Error("Role not found");

            // Update allowed fields
            role.name = updatedData.name || role.name;
            role.description = updatedData.description || role.description;
            role.imageUrl = updatedData.imageUrl || role.imageUrl;

            const updatedRole = await role.save();
            return updatedRole;

        } catch (error) {
            throw new Error(error.message);
        }
    }






}

module.exports = new RoleService;