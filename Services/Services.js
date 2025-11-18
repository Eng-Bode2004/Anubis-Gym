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
        return await PaymentProvider.find().sort({ createdAt: -1 });
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

        provider.is_active = typeof status === "boolean" ? status : !provider.is_active;
        await provider.save();

        return provider;
    }
}

module.exports = new PaymentProviderService();
