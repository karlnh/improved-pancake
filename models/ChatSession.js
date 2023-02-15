const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ChatSession extends Model {}

ChatSession.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    session_user: {
      type: DataTypes.STRING,
      // references: {
      //   model: 'user',
      //   key: 'user_id',
      // },
    },
    session_start:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
    session_end:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
    },
  {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    modelName: 'chatsession',
  }
);

module.exports = ChatSession;