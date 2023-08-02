import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt'

const UserModel = sequelize => {
  class User extends Model {  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey : true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: 'email already taken' },
        validate: {
          isEmail: {
            msg: 'only good email are accepted',
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue : 'John'
      },
      accessLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isCorrect: value => {
            console.log('value', value)
            if (![0,1,2,3].includes(value)) {
              throw Error(
                'the value of an accessLevel should be either 0 or 1'
              );
            }
          },
        },
      },
      number:{
        type:DataTypes.STRING,
        defaultValue : 'https://adn-backend-mj63t.ondigitalocean.app/public/images/profile.jpg'
      },
      // rbpiid : {
      //   type: DataTypes.INTEGER,
      //   defaultValue:0
      // },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'raspberry',
      },
    },
    {
      hooks:{
        afterCreate : (user)=>{
          bcrypt.hash(user.password , 10 , (err , hash)=>{
            user.update({password : hash}).then(usertemp => {
              console.log('user', usertemp.toJSON())
            })
          })
        },
      },
      sequelize,
      timestamps: true,
      createdAt: true,
      updatedAt: true,
    }
  );

  return User;
};

export default UserModel;
