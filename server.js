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






import express from 'express';
import cors from 'cors';
import admin from 'firebase-admin';
import paymentRoutes from './routes/payment';
import serviceAccount from './serviceAccountKey.json' assert { type: 'json' };

// 🔐 Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://advisora-2fd15-default-rtdb.firebaseio.com"
});

const app = express();

// 🔓 CORS - allow Angular frontend
app.use(cors({
  origin: 'https://advisora-project-yhnz.vercel.app', // your Angular app
  methods: ['GET','POST','OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// 📦 Register routes
app.use('/api', paymentRoutes);

// 🚀 No app.listen() needed for Vercel deployment
export default app;
