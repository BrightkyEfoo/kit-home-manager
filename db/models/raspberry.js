import { DataTypes, Model } from 'sequelize';

const RaspberryModel = sequelize => {
  class Raspberry extends Model {  }
  Raspberry.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey : true
      },
      state: {
        type: DataTypes.JSON,
        allowNull : false,
        defaultValue : {
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
          index : 0.0,
          price: 0.0
        }
      },
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

  return Raspberry;
};

export default RaspberryModel;
