import { DataTypes, Model } from 'sequelize';

const StatsModel = sequelize => {
  class Stats extends Model {  }
  Stats.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey : true
      },
      month: {
        type: DataTypes.STRING,
        allowNull : false,
      },
      price : {
        type : DataTypes.DOUBLE,
        allowNull: false
      },
      index : {
        type : DataTypes.DOUBLE,
        allowNull: false
      },
    },
    {
      sequelize,
      timestamps: true,
      createdAt: true,
      updatedAt: true,
    }
  );

  return Stats;
};

export default StatsModel;
