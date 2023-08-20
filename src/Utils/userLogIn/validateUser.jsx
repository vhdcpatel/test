import vaildUser from './users.json';

const validateUser = (userData) => {

  // one-Liner
  const foundUser = vaildUser.users.find(
    (user) =>
      user.username === userData.userName && user.password === userData.passWord
  );
   if (Boolean(foundUser)) {
     return { isValidUser: true, isAdmin: foundUser.isAdmin };
   }else {
     return { isValidUser: false, isAdmin: false };
   }
};

export default validateUser;
