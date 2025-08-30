const express = require('express');
const Razorpay = require('razorpay');
const { getFirestore } = require('firebase-admin/firestore');

const router = express.Router();

router.post('/create-order', async (req, res) => {
  try {
    const { consultantId, amount, sessionId } = req.body;
    const db = getFirestore();
    const docRef = db.collection('consultants').doc(consultantId);
    const docSnap = await docRef.get();

    if (!docSnap.exists) return res.status(404).send('Consultant not found');

    const data = docSnap.data();

    const razorpay = new Razorpay({
      key_id: data.razorpayKeyID,
      key_secret: data.razorpayKeySecret,
    });

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: 'INR',
      receipt: `session_${sessionId}`,
      notes: {
        consultantId, 
        sessionId,
      },
    });

    res.send({
      orderId: order.id,
      key: data.razorpayKeyID,
    });
  } catch (error) {
    console.error("❌ Error creating Razorpay order:", error);
    res.status(500).send('Payment Failed due to server error.');
  }
});

module.exports = router;
