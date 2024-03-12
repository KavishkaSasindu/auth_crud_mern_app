const jwt = require("jsonwebtoken");

const authMiddleware = async (request, response, next) => {
  try {
    const authorizationHeader = request.headers.authorization;
    if (!authorizationHeader) {
      return response.status(401).json({
        message: "Unauthorized !! access denied",
      });
    }

    const token = await authorizationHeader.split(" ")[1];

    const decoded = await jwt.verify(token, "secret");
    const userId = decoded.userId;
    console.log(userId);
    next();
  } catch (error) {
    return response.status(404).json({
      error: error.message,
    });
  }
};

module.exports = authMiddleware;
