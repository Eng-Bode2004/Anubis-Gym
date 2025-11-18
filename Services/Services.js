const axios = require('axios');
const PaymentMethod = require('../Models/Model');
const mongoose = require('mongoose');
const PLAN_API = "https://anubis-subscriptionplan.onrender.com/api/v2/subscription_plans/";

class PaymentService {

    static async createPayment({ traineeId, planId, payment_provider, payment_proof }) {
        if (!traineeId || !planId || !payment_proof || !payment_provider) {
            throw new Error('Missing required fields');
        }

        if (!mongoose.Types.ObjectId.isValid(traineeId))
            throw new Error('Invalid trainee ID');
        if (!mongoose.Types.ObjectId.isValid(planId))
            throw new Error('Invalid plan ID');

        let planData;
        try {
            const planResponse = await axios.get(`${PLAN_API}${planId}`);
            planData = planResponse.data?.data;
        } catch (err) {
            throw new Error('Failed to fetch subscription plan: ' + err.message);
        }
        if (!planData) throw new Error('Subscription plan not found');

        const payment = new PaymentMethod({
            Trainee_Profile: traineeId,
            SubscriptionPlan: planId,
            amount: planData.price,
            payment_provider,
            payment_proof,
            status: 'pending'
        });

        try {
            await payment.save();
        } catch (err) {
            throw new Error('Failed to save payment: ' + err.message);
        }

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
