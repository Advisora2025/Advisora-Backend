// const express = require('express');
// const Razorpay = require('razorpay');
// const { getFirestore } = require('firebase-admin/firestore');

// const router = express.Router();


// router.post('/create-order', async (req, res) => {
//   try {
//     const { consultantId, amount, sessionId } = req.body;
//     const db = getFirestore();
//     const docRef = db.collection('consultants').doc(consultantId);
//     const docSnap = await docRef.get();

//     if (!docSnap.exists) return res.status(404).send('Consultant not found');

//     const data = docSnap.data();

//     const razorpay = new Razorpay({
//       key_id: data.razorpayKeyID,
//       key_secret: data.razorpayKeySecret,
//     });

//     const order = await razorpay.orders.create({
//       amount: amount * 100,
//       currency: 'INR',
//       receipt: `session_${sessionId}`,
//       notes: {
//         consultantId, 
//         sessionId,
//       },
//     });

//     res.send({
//       orderId: order.id,
//       key: data.razorpayKeyID,
//     });
//   } catch (error) {
//     console.error("❌ Error creating Razorpay order:", error);
//     res.status(500).send('Payment Failed due to server error.');
//   }
// });

// module.exports = router;

const { Router } = require('express');
const Razorpay = require('razorpay');
const { getFirestore } = require('firebase-admin/firestore');

const router = Router();


// Handle preflight OPTIONS request
router.options('/create-order', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://advisora-project-yhnz.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.status(200).end();
});

// POST /create-order
router.post('/create-order', async (req, res) => {
  try {
    console.log('⚡ /create-order hit!'); // <-- This will print whenever route is called
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
      notes: { consultantId, sessionId },
    });

    res.status(200).json({
      orderId: order.id,
      key: data.razorpayKeyID,
    });
  } catch (error) {
    console.error('❌ Error creating Razorpay order:', error);
    res.status(500).send('Payment Failed due to server error.');
  }
});
app.use(express.json());
// 📦 Register routes
app.use('/api', paymentRoutes);

module.exports = router;
