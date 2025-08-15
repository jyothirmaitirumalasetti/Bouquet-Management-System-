// models/Order.js
module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    Order.associate = models => {
      Order.belongsTo(models.User, { foreignKey: 'userId' });
      Order.hasMany(models.OrderLine, { foreignKey: 'orderId' });
    };
  
    return Order;
  };
  