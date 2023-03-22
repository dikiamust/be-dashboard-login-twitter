module.exports = (err, req, res, next) => {
    let code;
    let name = err.name;
    let message;
  
    switch (name) {
      case "NOT_FOUND":
        code = 401;
        message = "Task is not found or has been deleted!";
        break;
  
      default:
        code = 500;
        message = "Internal server error!";
    }
  
    if(err.name === 'ValidationError') {
      return  res.status(400).json({success: false, message: err.toString()});
    }

    res.status(code).json({success: false, message});
};
  