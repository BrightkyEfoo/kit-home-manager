import { Raspberry, Stats, User } from '../../db/Sequelize.js';

const months = [
  'Janvier',
  'Fevrier',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Aout',
  'Septembre',
  'Octobre',
  'Novembre',
  'Decembre',
];
export const pushStat = (req, res) => {
  const { UserId, password, index, price, month } = req.body;
  if (!UserId || !password) {
    return res.status(407).json({ msg: 'all fields are required' });
  }
  User.findByPk(UserId, { include: Raspberry })
    .then(user => {
      if (!user) {
        return res.status(404).json({ msg: 'user not found' });
      }
      if (password !== user.Raspberry.password) {
        return res.status(403).json({ msg: 'unauthorized' });
      }
      Stats.create({
        index,
        price,
        month:months[month],
        UserId,
      })
        .then(stat => {
          return res.json({ msg: 'succes', stat });
        })
        .catch(err => {
          return res.status(403).json({ msg: 'error', err });
        });
    })
    .catch(err => {
      return res.status(500).json({ msg: 'something went wrong', err });
    });
};

export const getStats = (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ msg: 'user id is required' });
  }

  User.findByPk(userId, { include: Stats })
    .then(user => {
      if (!user) {
        return res.status(404).json({ msg: 'not found' });
      }
      return res.json({ msg: 'success', stats: user.Stats });
    })
    .catch(err => {
      return res.status(500).json({ msg: 'something went wrong', err });
    });
};
