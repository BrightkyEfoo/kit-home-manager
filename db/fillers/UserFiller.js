import { User } from "../Sequelize.js";

const users = [
  {
    name: 'FONDJO gilres',
    number:'+237658185246',
    password: 'raspberry',
    email:'test@test.com',
    accessLevel: 0,
  }
];

export const userFill = () => {
  users.forEach((element,i) => {
    User.create(element)
      .then(user => {
        console.log(`user : ${i}`)
        console.log('user', user)
      })
      .catch(err => console.log('err', err));
  });
};
