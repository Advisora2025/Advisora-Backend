// const express = require('express');
// const cors = require('cors');
// const admin = require('firebase-admin');
// const paymentRoutes = require('./routes/payment');
// const serviceAccount = require('./serviceAccountKey.json');

// // 🔐 Initialize Firebase Admin
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://advisora-2fd15-default-rtdb.firebaseio.com"
// });

// const app = express();

// // 🔓 Allow frontend access (Angular: http://localhost:4200)
// app.use(cors({ origin: 'https://advisora-project-yhnz.vercel.app' }));
// app.use(express.json());

// // 📦 Register routes
// app.use('/api', paymentRoutes);

// // 🚀 Start server
// // const PORT = 3000;
// // app.listen(PORT, () => {
// //   console.log(`✅ Backend running at http://localhost:${PORT}`);
// // });

const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const paymentRoutes = require('./routes/payment');
// const serviceAccount = require('./serviceAccountKey.json'); // CommonJS require


if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  throw new Error("FIREBASE_SERVICE_ACCOUNT is not set");
}

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

// 🔐 Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://advisora-2fd15-default-rtdb.firebaseio.com"
});

const app = express();

// 🔓 CORS - allow Angular frontend
app.use(cors({
  origin: 'https://advisora-project-yhnz.vercel.app', // your Angular app
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// 📦 Register routes
app.use('/api', paymentRoutes);

// ✅ Middleware to log all incoming requests (optional for debugging)
app.use((req, res, next) => {
  console.log(`Incoming ${req.method} request to ${req.url}`);
  next();
});

// 🚀 No app.listen() needed for Vercel deployment
module.exports = app;
