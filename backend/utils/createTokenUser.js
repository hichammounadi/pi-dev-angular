const createTokenUser = (user) => {
    return { fullname: user.fullname, userId: user._id, userRole: user.role};
  };
  
  module.exports = createTokenUser;
  