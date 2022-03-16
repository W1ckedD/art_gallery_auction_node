import express from 'express';

export const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
import authRoutes from './routes/auth.routes.js';

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ app: 'Hello' });
});

