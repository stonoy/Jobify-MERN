import { StatusCodes } from "http-status-codes";

const Error_Handler = (err, req, res, next) => {
  let errObj = {
    msg: err.message || "Internal server error",
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  res.status(errObj.statusCode).json({ msg: errObj.msg });
};

export default Error_Handler;
