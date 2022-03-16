import express from 'express';

export const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
import authRoutes from './routes/auth.routes.js';
import artworkRoutes from './routes/artwork.routes.js';
import path from 'path'
app.use('/auth', authRoutes);
app.use('/artworks', artworkRoutes);

app.get('/', (req, res) => {
  console.log(path.dirname(''));
  res.json({ app: 'Hello' });
});

