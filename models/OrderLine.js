// models/OrderLine.js
module.exports = (sequelize, DataTypes) => {
    const OrderLine = sequelize.define('OrderLine', {
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false
      }
    });
  
    OrderLine.associate = models => {
      OrderLine.belongsTo(models.Order, { foreignKey: 'orderId' });
      OrderLine.belongsTo(models.Product, { foreignKey: 'productId' });
    };
  
    return OrderLine;
  };
  