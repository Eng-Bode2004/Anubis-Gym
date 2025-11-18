const PaymentProviderService = require('../Services/Services');

class PaymentProviderController {

    // ➤ Create
    async create(req, res) {
        try {
            const provider = await PaymentProviderService.createProvider(req.body);
            res.status(201).json({ status: "success", data: provider });
        } catch (err) {
            res.status(400).json({ status: "error", message: err.message });
        }
    }

    // ➤ Get All
    async getAll(req, res) {
        try {
            const providers = await PaymentProviderService.getAllProviders();
            res.json({ status: "success", data: providers });
        } catch (err) {
            res.status(500).json({ status: "error", message: err.message });
        }
    }

    // ➤ Update
    async update(req, res) {
        try {
            const { id } = req.params;
            const updated = await PaymentProviderService.updateProvider(id, req.body);
            res.json({ status: "success", data: updated });
        } catch (err) {
            res.status(400).json({ status: "error", message: err.message });
        }
    }

    // ➤ Delete
    async delete(req, res) {
        try {
            const { id } = req.params;
            const result = await PaymentProviderService.deleteProvider(id);
            res.json({ status: "success", data: result });
        } catch (err) {
            res.status(400).json({ status: "error", message: err.message });
        }
    }

    // ➤ Activate / Deactivate
    async toggleStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            const provider = await PaymentProviderService.toggleStatus(id, status);
            res.json({ status: "success", data: provider });
        } catch (err) {
            res.status(400).json({ status: "error", message: err.message });
        }
    }
}

module.exports = new PaymentProviderController();
