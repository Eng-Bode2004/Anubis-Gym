const PaymentProvider = require('../Models/Model');

class PaymentProviderService {

    // ➤ Create Payment Provider
    async createProvider(data) {
        const { name, Provider, type } = data;

        if (!name || !Provider || !type) throw new Error("All fields are required");

        // Check duplicate by name or provider ID
        const exist = await PaymentProvider.findOne({
            $or: [{ name }, { Provider }]
        });

        if (exist) throw new Error("Payment provider already exists");

        return await PaymentProvider.create({ name, Provider, type, is_active: true });
    }

    // ➤ Get All Providers
    async getAllProviders() {
        const providers = await PaymentProvider.find().sort({ createdAt: -1 });
        return providers.map(p => ({
            ...p.toObject(),
            status: p.is_active ? "active" : "inactive",
        }));
    }

    // ➤ Update Provider
    async updateProvider(id, data) {
        if (!id) throw new Error("Provider ID is required");

        const provider = await PaymentProvider.findById(id);
        if (!provider) throw new Error("Provider not found");

        return await PaymentProvider.findByIdAndUpdate(id, { $set: data }, { new: true });
    }

    // ➤ Delete Provider
    async deleteProvider(id) {
        if (!id) throw new Error("Provider ID is required");

        const provider = await PaymentProvider.findById(id);
        if (!provider) throw new Error("Provider not found");

        await PaymentProvider.findByIdAndDelete(id);
        return { message: "Payment provider deleted successfully" };
    }

    // ➤ Activate / Deactivate provider
    async toggleStatus(id, status) {
        const provider = await PaymentProvider.findById(id);
        if (!provider) throw new Error("Provider not found");

        provider.is_active = status;
        await provider.save();

        return {
            ...provider.toObject(),
            status: provider.is_active ? "active" : "inactive",
        };
    }

}

module.exports = new PaymentProviderService();
