import { Raspberry, User } from '../../db/Sequelize.js';

export const changeStateByUser = (req, res) => {
  const state = req.body.state;

  const rbpid = req.body.rbpid;
  const userId = req.body.userId;

  if (!state) {
    return res
      .status(400)
      .json({ msg: 'you should always provide a new state' });
  }

  Raspberry.findByPk(rbpid)
    .then(raspberry => {
      delete state.price;
      delete state.index;
      console.log('state', state);
      raspberry
        .update({ state: { ...raspberry.state, ...state } })
        .then(rbpUpdated => {
          console.log('rbpUpdated', rbpUpdated.toJSON());
          return res.json({ msg: 'success', state: rbpUpdated.state });
        });
    })
    .catch(err => {
      return res.status(400).json({ msg: 'something went wrong', err });
    });
};

export const changeStateByRaspberry = (req, res) => {
  const { state, id, password } = req.body;
  if (!state || !id || !password) {
    return res.status(400).json({ msg: 'all fields are required' });
  }
  Raspberry.findByPk(id)
    .then(raspberry => {
      if (raspberry.password !== password) {
        return res.status(400).json({ msg: 'wrong password for engine' });
      }
      raspberry
        .update({ state: { ...raspberry.state, ...state } })
        .then(rbpUpdated => {
          console.log('rbpUpdated', rbpUpdated.toJSON());
          return res.json({ msg: 'success', state: rbpUpdated.state });
        });
    })
    .catch(err => {
      return res.status(400).json({ msg: 'something went wrong', err });
    });
};

export const changePIByRaspberry = (req, res) => {
  const { price, index, id, password } = req.body;
  if (
    price === undefined ||
    index === undefined ||
    id === undefined ||
    password === undefined
  ) {
    return res.status(400).json({ msg: 'all fields are required' });
  }
  Raspberry.findByPk(id)
    .then(raspberry => {
      if (raspberry.password !== password) {
        return res.status(400).json({ msg: 'wrong password for engine' });
      }
      raspberry
        .update({ state: { ...raspberry.state, price, index } })
        .then(rbpUpdated => {
          console.log('rbpUpdated', rbpUpdated.toJSON());
          return res.json({ msg: 'success', state: rbpUpdated.state });
        });
    })
    .catch(err => {
      return res.status(400).json({ msg: 'something went wrong', err });
    });
};

export const getStateR = (req, res) => {
  const id = parseInt(req.body.id);
  console.log('id', id);
  const { password } = req.body;
  if (!id) {
    return res.status(400).json({ msg: 'id of engine is required obviously' });
  }
  Raspberry.findByPk(id, { include: User })
    .then(raspberry => {
      if (raspberry.password !== password) {
        return res.status(400).json({ msg: 'wrong password for engine' });
      }
      return res.json({
        msg: 'success',
        state: raspberry.state,
        user: raspberry.User,
      });
    })
    .catch(err => {
      return res.status(400).json({ msg: 'something went wrong', err });
    });
};

export const getState = (req, res) => {
  const id = parseInt(req.query.id);
  User.findByPk(id, { include: Raspberry })
    .then(user => {
      if (!user) {
        return res.status(404).json({ msg: 'user not found' });
      }
      if (req.user.userId !== id) {
        return res.status(403).json({ msg: 'you are not allowed' });
      }
      return res.json({ msg: 'success', state: user.Raspberry.state });
    })
    .catch(err => {
      return res.status(400).json({ msg: 'something went wrong', err });
    });
};

export const getRaspberryInfos = (req, res) => {
  const { UserId } = req.body;
  if (!UserId) {
    return res
      .status(400)
      .json({ msg: 'you should always provide the user Id' });
  }

  User.findByPk(UserId, { include: Raspberry })
    .then(user => {
      if (!user) {
        return res.status(404).json({ msg: 'user not found' });
      }
      return res.json({ msg: 'success', user });
    })
    .catch(err => {
      return res.status(400).json({ msg: 'something went wrong', err });
    });
};
