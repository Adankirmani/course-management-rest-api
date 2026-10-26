
const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }

  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: "Duplicate value already exists"
    });
  }

  res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
};

module.exports = errorHandler;
