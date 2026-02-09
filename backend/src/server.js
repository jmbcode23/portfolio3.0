import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
dotenv.config();
import { Router } from "express";
import { z } from "zod";
import { sendContactEmail } from "./controllers/contactController.js";

const router = Router();

const ContactSchema = z.object({
  name: z.string().min(2, "Name is too short").max(80),
  email: z.string().email("Invalid email"),
  subject: z.string().min(2, "Subject is too short").max(120),
  message: z.string().min(10, "Message is too short").max(3000),
});

// Initialize express app
const app = express();

// Security middleware
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);

// CORS configuration
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? process.env.ALLOWED_ORIGINS?.split(",") || ["http://localhost:5174"]
      : "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later.",
  },
});

// Apply rate limiting to API routes
app.use("/api/", limiter);

// Compression middleware
app.use(compression());

// Request logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
  });
});

// API Routes
app.use(
  "/api",
  router.post("/contact", async (req, res) => {
    const parsed = ContactSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid input",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    try {
      await sendContactEmail(parsed.data);
      return res.status(200).json({ message: "Message sent successfully" });
    } catch (err) {
      console.error("CONTACT EMAIL ERROR:", err);
      return res.status(500).json({ message: "Failed to send message" });
    }
  }),
);

// Welcome route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Ubryft API Service",
    version: "1.0.0",
    documentation: process.env.API_DOCS_URL || "/api-docs",
    status: "operational",
  });
});

function notFound(req, res, next) {
  res.status(404);
  next(new Error(`Not Found - ${req.originalUrl}`));
}

function errorHandler(err, req, res, next) {
  const statusCode =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Server Error",
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
}

// 404 handler
app.use(notFound);

// Error handler (should be last)
app.use(errorHandler);

// Database connection
connectDB()
  .then(() => {
    const PORT = Number(process.env.PORT) || 5000;
    const HOST = "0.0.0.0";

    const server = app.listen(PORT, HOST, () => {
      console.log(`🚀 Server ready on port ${PORT}`);
    });

    // Handle unhandled promise rejections
    process.on("unhandledRejection", (err) => {
      console.error("Unhandled Promise Rejection:", err.message);
      console.error(err.stack);
      // Close server & exit process
      server.close(() => process.exit(1));
    });

    // Handle uncaught exceptions
    process.on("uncaughtException", (err) => {
      console.error("Uncaught Exception:", err.message);
      console.error(err.stack);
      process.exit(1);
    });

    // Graceful shutdown
    process.on("SIGTERM", () => {
      console.log("SIGTERM received. Shutting down gracefully...");
      server.close(() => {
        console.log("Process terminated");
        process.exit(0);
      });
    });
  })
  .catch((error) => {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  });

export default app;
