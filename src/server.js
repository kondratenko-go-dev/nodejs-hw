import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import notesRoutes from './routes/notesRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

// Middleware
app.use(logger);
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routes
app.use(authRoutes);
app.use(notesRoutes);

// 404 for unknown routes
app.use(notFoundHandler);

// Celebrate validation errors (400)
app.use(errors());

// Global error handler (must be last)
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});