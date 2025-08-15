// models/User.js
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    });
  
    User.associate = models => {
      User.hasMany(models.Order, { foreignKey: 'userId', as: 'orders' });
    };
  
    return User;
  };
  