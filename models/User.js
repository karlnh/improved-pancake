const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
};

// make new user
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // must not be an empty string
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5,10],
      },
    },
  },
  {
    hooks: {
    // hash password before it is created
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      // hash the password before it is updated
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      },
    },
    // sequelize connection to db
    sequelize,
    // Don't automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    // Don't pluralize name of database table
    freezeTableName: true,
    // Use underscores instead of camel-casing
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;