const asyncHandler = (func) => {
  return async (req, res) => {
    try {
      await func(req, res);
    } catch (error) {
      console.log("this is error", error);
      return res.json({
        success: false,
        error,
        msg: "Server Side Error Occurred.",
      });
    }
  };
};
module.exports = asyncHandler;
