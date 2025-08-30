const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const paymentRoutes = require('./routes/payment');
const serviceAccount = require('./serviceAccountKey.json');

// 🔐 Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://advisora-2fd15-default-rtdb.firebaseio.com"
});

const app = express();

// 🔓 Allow frontend access (Angular: http://localhost:4200)
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

// 📦 Register routes
app.use('/api', paymentRoutes);

// 🚀 Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
