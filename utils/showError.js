module.exports = (error, res) => {
    console.log(error.message);
    res.status(400).json({
      error,
      message: "Bad Request.",
    });
  };
  