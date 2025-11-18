const axios = require('axios');
const PaymentMethod = require('../Models/Model');

const PLAN_API = "https://anubis-subscriptionplan.onrender.com/api/v2/subscription_plans/";

class PaymentService {

    static async createPayment({ traineeId, planId, payment_provider, payment_proof }) {
        if (!traineeId || !planId || !payment_proof || !payment_provider) {
            throw new Error('Missing required fields');
        }

        // 1) Fetch subscription plan
        const planResponse = await axios.get(`${PLAN_API}${planId}`);
        const planData = planResponse.data?.data;
        if (!planData) throw new Error('Subscription plan not found');

        // // 2) Fetch trainee profile
        // const traineeResponse = await axios.get(`${TRAINEE_API}${traineeId}`);
        // const traineeData = traineeResponse.data?.data;
        // if (!traineeData) throw new Error('Trainee profile not found');

        // 3) Create PaymentMethod
        const payment = new PaymentMethod({
            Trainee_Profile: traineeId,
            SubscriptionPlan: planId,

            // Store full trainee profile
            // trainee_data: traineeData,

            // Store plan price
            amount: planData.price,

            payment_provider,
            payment_proof,
            status: 'pending'
        });

        await payment.save();
        return payment;
    }

    static async completePayment(paymentId) {
        const payment = await PaymentMethod.findById(paymentId);
        if (!payment) throw new Error('Payment not found');

        payment.status = 'completed';
        payment.paid_at = new Date();
        await payment.save();

        return payment;
    }

    static async getAllPayments() {
        return PaymentMethod.find();
    }

    static async getPendingPayments() {
        return PaymentMethod.find({ status: 'pending' });
    }
}

module.exports = PaymentService;
