require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// 🔧 Middleware
app.use(cors());
app.use(express.json());

// 🔁 Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const projectRoutes = require('./routes/project');
const fileRoutes = require('./routes/file');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/files', fileRoutes);

// ✅ Test route
app.get('/', (req, res) => {
  res.send('🚀 PixelForge backend is running!');
});

// 🌍 MongoDB + Server start
const PORT = process.env.PORT || 5000;

console.log("🔥 Starting server...");
console.log("🌍 Mongo URI:", process.env.MONGO_URI);
console.log("🔑 JWT Secret:", process.env.JWT_SECRET ? "Loaded ✅" : "Missing ❌");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
  });
