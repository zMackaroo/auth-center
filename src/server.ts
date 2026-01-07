import mongoose from "mongoose";
import App from "./app";

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI!;

process.on("uncaughtException", (err) => {
  console.error("❌ UNCAUGHT EXCEPTION! Shutting down...");
  console.error(err.name, err.message);
  process.exit(1);
});

// Connect to database and start server
const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("📦 Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }

  const server = App.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📝 Environment: ${process.env.NODE_ENV}`);
  });

  // Handle unhandled promise rejections
  process.on("unhandledRejection", (err: Error) => {
    console.error("❌ UNHANDLED REJECTION! Shutting down...");
    console.error(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
  });

  // Graceful shutdown
  process.on("SIGTERM", () => {
    console.log("👋 SIGTERM received. Shutting down gracefully...");
    server.close(() => {
      console.log("💤 Process terminated.");
    });
  });
};

startServer();
