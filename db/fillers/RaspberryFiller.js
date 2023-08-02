import { Raspberry } from '../Sequelize.js';

const raspberries = [
  {
    state: {
      room1: false,
      room2: false,
      room3: false,
      room4: false,
      room5: false,
      room6: false,
      room7: false,
      room8: false,
      room9: false,
      room10: false,
      index: 0.0,
      price: 0.0,
    },
    UserId : 1,
    password : 'raspberry'
  },
];

export const raspberryFIll = () => {
  raspberries.forEach((element, i) => {
    Raspberry.create(element)
      .then(raspberry => {
        console.log(`raspberry : ${i}`);
        console.log('raspberry', raspberry)

      })
      .catch(err => console.log('err', err));
  });
};
