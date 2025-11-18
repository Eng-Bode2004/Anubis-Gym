// Controllers/PaymentProvider_Controller.js
const PaymentProviderService = require('../Services/Services');

class PaymentProviderController {

    // ➤ Create
    async create(req, res) {
        try {
            const provider = await PaymentProviderService.createProvider(req.body);
            res.status(201).json({
                status: "success",
                provider
            });
        } catch (err) {
            res.status(500).json({ status: "error", error: err.message });
        }
    }

    // ➤ Get All
    async getAll(req, res) {
        try {
            const providers = await PaymentProviderService.getAllProviders();
            res.json({ status: "success", providers });
        } catch (err) {
            res.status(500).json({ status: "error", error: err.message });
        }
    }

    // ➤ Update
    async update(req, res) {
        try {
            const id = req.params.id;
            const updated = await PaymentProviderService.updateProvider(id, req.body);

            res.json({ status: "success", updated });
        } catch (err) {
            res.status(500).json({ status: "error", error: err.message });
        }
    }

    // ➤ Delete
    async delete(req, res) {
        try {
            const id = req.params.id;
            const result = await PaymentProviderService.deleteProvider(id);
            res.json({ status: "success", result });
        } catch (err) {
            res.status(500).json({ status: "error", error: err.message });
        }
    }

    // ➤ Activate / Deactivate
    async toggleStatus(req, res) {
        try {
            const id = req.params.id;
            const { status } = req.body; // true / false

            const provider = await PaymentProviderService.toggleStatus(id, status);

            res.json({
                status: "success",
                provider
            });
        } catch (err) {
            res.status(500).json({ status: "error", error: err.message });
        }
    }
}

module.exports = new PaymentProviderController();
