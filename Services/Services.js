const axios = require('axios');
const PaymentMethod = require('../Models/Model');
const API_BASE_URL = "https://anubis-subscriptionplan.onrender.com/api/v2/subscription_plans/";

class PaymentService {

    // Create payment
    static async createPayment({ traineeId, planId, payment_provider, payment_proof }) {
        if (!traineeId || !planId || !payment_proof ||!payment_provider) {
            throw new Error('Missing required fields');
        }

        // Fetch subscription plan from API
        const response = await axios.get(`${API_BASE_URL}${planId}`);
        const planData = response.data;

        if (!planData || !planData.price) {
            throw new Error('Subscription plan not found');
        }

        // Create PaymentMethod
        const payment = new PaymentMethod({
            Trainee_Profile: traineeId,
            SubscriptionPlan: planId,
            amount: planData.price,
            payment_provider,
            payment_proof,
            status: 'pending'
        });

        await payment.save();
        return payment;
    }

    // Complete payment
    static async completePayment(paymentId) {
        const payment = await PaymentMethod.findById(paymentId);
        if (!payment) throw new Error('Payment not found');

        payment.status = 'completed';
        payment.paid_at = new Date();
        await payment.save();



        return payment;
    }

    // Optional: get all payments
    static async getAllPayments() {
        return PaymentMethod.find();
    }

    static async getPendingPayments() {
        return PaymentMethod.find({ status: 'pending' });
    }
}

module.exports = PaymentService;
