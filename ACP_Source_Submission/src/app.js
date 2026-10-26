
const express = require("express");
const cors = require("cors");

const authRoutes = require("./modules/auth/auth.routes");
const categoryRoutes = require("./modules/category/category.routes");
const courseRoutes = require("./modules/course/course.routes");
const errorHandler = require("./middleware/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

// HOME ROUTE
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ACP REST API is running successfully"
  });
});

// MODULE ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/courses", courseRoutes);

// UNKNOWN ROUTE - 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found"
  });
});

// ERROR HANDLER
app.use(errorHandler);

module.exports = app;
