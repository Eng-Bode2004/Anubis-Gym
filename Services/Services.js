// Services/PaymentProvider_Service.js
const PaymentProvider = require('../Models/Model');

class PaymentProviderService {

    // ➤ Create Payment Provider
    async createProvider(data) {
        const { name, Provider, type } = data;

        // Check duplicate
        const exist = await PaymentProvider.findOne({
            $or: [{ name }, { Provider }]
        });

        if (exist) throw new Error("Payment provider already exists");

        return await PaymentProvider.create({ name, Provider, type });
    }

    // ➤ Get All Providers
    async getAllProviders() {
        return await PaymentProvider.find();
    }

    // ➤ Update Provider
    async updateProvider(id, data) {
        const provider = await PaymentProvider.findById(id);
        if (!provider) throw new Error("Provider not found");

        return await PaymentProvider.findByIdAndUpdate(id, { $set: data }, { new: true });
    }

    // ➤ Delete Provider
    async deleteProvider(id) {
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

        return provider;
    }
}

module.exports = new PaymentProviderService();
