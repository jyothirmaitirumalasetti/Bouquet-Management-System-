// models/Product.js
module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    });
  
    Product.associate = models => {
      Product.hasMany(models.OrderLine, { foreignKey: 'productId' });
    };
  
    return Product;
  };
  